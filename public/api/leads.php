<?php

declare(strict_types=1);

/**
 * Nureke — лид қабылдау нүктесі.
 *
 * Неге PHP: хостинг PHP-only, Node процесі жүрмейді (ADR-0002b).
 * Бұл файл `src/app/api/leads/route.ts` логикасын дәл қайталайды:
 * rate limit → бот қақпаны → валидация → бағалау → Telegram → файлға жазу.
 *
 * БАСТЫ ЕРЕЖЕ: лид жоғалмауы керек. Telegram істемей қалса да, өтінім
 * дискіге жазылады. Екеуі де істемесе — клиентке адал қате қайтарамыз.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** @param array<string,mixed> $payload */
function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Метод не поддерживается.']);
}

// ── Конфигурация ────────────────────────────────────────────────────────────
// config.php репозиторийге кірмейді (құпиялар сонда). Үлгі: config.example.php
$configPath = __DIR__ . '/config.php';
$config = is_file($configPath) ? require $configPath : [];

$botToken = (string) ($config['telegram_bot_token'] ?? '');
$chatId   = (string) ($config['telegram_chat_id'] ?? '');

// Дискідегі қойма — ӘРҚАШАН web root-тан ТЫС.
$defaultStorage = dirname($_SERVER['DOCUMENT_ROOT'] ?? __DIR__ . '/..') . '/nureke-data';
$storageDir = (string) ($config['storage_dir'] ?? $defaultStorage);

// ── Rate limit ──────────────────────────────────────────────────────────────
// 15 минутта бір IP-ден 10 өтінім (route.ts-тегі шектеумен бірдей).
const RATE_WINDOW_SECONDS = 900;
const RATE_MAX_HITS = 10;

function clientIp(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($forwarded !== '') {
        return trim(explode(',', $forwarded)[0]);
    }
    return (string) ($_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/**
 * Файлға негізделген санауыш. Ортақ хостингте процесс жадысы сақталмайды,
 * сондықтан есеп дискіде жүреді.
 *
 * @return array{allowed:bool,retry_after:int}
 */
function checkRateLimit(string $dir, string $ip): array
{
    $rateDir = $dir . '/ratelimit';
    if (!is_dir($rateDir) && !@mkdir($rateDir, 0700, true) && !is_dir($rateDir)) {
        // Санауышты жаза алмасақ — өтінімді бұғаттамаймыз. Лид маңыздырақ.
        return ['allowed' => true, 'retry_after' => 0];
    }

    $file = $rateDir . '/' . hash('sha256', $ip) . '.json';
    $now = time();

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return ['allowed' => true, 'retry_after' => 0];
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return ['allowed' => true, 'retry_after' => 0];
        }

        $raw = stream_get_contents($handle);
        $state = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;

        $count = 0;
        $resetAt = 0;
        if (is_array($state)) {
            $count = (int) ($state['count'] ?? 0);
            $resetAt = (int) ($state['reset_at'] ?? 0);
        }

        if ($resetAt <= $now) {
            $count = 0;
            $resetAt = $now + RATE_WINDOW_SECONDS;
        }

        $count++;

        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, (string) json_encode(['count' => $count, 'reset_at' => $resetAt]));
        fflush($handle);

        if ($count > RATE_MAX_HITS) {
            return ['allowed' => false, 'retry_after' => max(1, $resetAt - $now)];
        }
        return ['allowed' => true, 'retry_after' => 0];
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

$ip = clientIp();
$limit = checkRateLimit($storageDir, $ip);
if (!$limit['allowed']) {
    header('Retry-After: ' . $limit['retry_after']);
    respond(429, [
        'ok' => false,
        'error' => 'Слишком много попыток. Напишите нам в WhatsApp — так быстрее.',
    ]);
}

// ── Кіріс деректер ──────────────────────────────────────────────────────────
$body = file_get_contents('php://input');
if ($body === false || $body === '' || strlen($body) > 20000) {
    respond(400, ['ok' => false, 'error' => 'Некорректный запрос.']);
}

$raw = json_decode($body, true);
if (!is_array($raw)) {
    respond(400, ['ok' => false, 'error' => 'Некорректный запрос.']);
}

function field(array $raw, string $key): string
{
    $value = $raw[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

// Бот қақпаны сработал: сәтті деп жауап береміз, әйтпесе бот айналып өтуді іздейді.
if (field($raw, 'website') !== '') {
    respond(200, ['ok' => true]);
}

// ── Валидация (lead.ts-тегі zod схемасымен бірдей) ──────────────────────────
const PROJECT_TYPES = ['AI_AUTOMATION', 'MOBILE', 'MINIAPP', 'WEBSITE', 'CRM', 'UNKNOWN'];
const BUDGET_RANGES = ['UNDER_1M', 'FROM_1M_TO_3M', 'FROM_3M_TO_10M', 'OVER_10M', 'UNKNOWN'];

$name = field($raw, 'name');
if (mb_strlen($name) < 2 || mb_strlen($name) > 80) {
    respond(400, ['ok' => false, 'error' => 'Укажите имя']);
}

$phone = field($raw, 'phone');
if (mb_strlen($phone) < 9 || mb_strlen($phone) > 24) {
    respond(400, ['ok' => false, 'error' => 'Укажите номер WhatsApp']);
}
if (preg_match('/^[+\d][\d\s()-]+$/', $phone) !== 1) {
    respond(400, ['ok' => false, 'error' => 'Номер выглядит некорректно']);
}

$projectType = field($raw, 'projectType');
if (!in_array($projectType, PROJECT_TYPES, true)) {
    $projectType = 'UNKNOWN';
}

$budgetRange = field($raw, 'budgetRange');
if (!in_array($budgetRange, BUDGET_RANGES, true)) {
    $budgetRange = 'UNKNOWN';
}

$message = mb_substr(field($raw, 'message'), 0, 2000);
$company = mb_substr(field($raw, 'company'), 0, 120);
$pageUrl = mb_substr(field($raw, 'pageUrl'), 0, 500);

// ── Бағалау (lead.ts → scoreLead) ───────────────────────────────────────────
$budgetScore = [
    'OVER_10M' => 35, 'FROM_3M_TO_10M' => 30, 'FROM_1M_TO_3M' => 22,
    'UNDER_1M' => 8, 'UNKNOWN' => 0,
];
$typeScore = [
    'MOBILE' => 20, 'CRM' => 18, 'MINIAPP' => 16,
    'AI_AUTOMATION' => 15, 'WEBSITE' => 8, 'UNKNOWN' => 4,
];

$score = $budgetScore[$budgetRange] + $typeScore[$projectType];
$messageLength = mb_strlen($message);
if ($messageLength >= 200) {
    $score += 20;
} elseif ($messageLength >= 60) {
    $score += 12;
} elseif ($messageLength > 0) {
    $score += 5;
}
if ($company !== '') {
    $score += 10;
}
$score = min(100, $score);
$temperature = $score >= 60 ? 'HOT' : ($score >= 35 ? 'WARM' : 'COLD');

// ── Дискіге жазу ────────────────────────────────────────────────────────────
$leadId = bin2hex(random_bytes(8));
$lead = [
    'id' => $leadId,
    'created_at' => gmdate('c'),
    'name' => $name,
    'company' => $company !== '' ? $company : null,
    'phone' => $phone,
    'project_type' => $projectType,
    'budget_range' => $budgetRange,
    'message' => $message !== '' ? $message : null,
    'page_url' => $pageUrl !== '' ? $pageUrl : null,
    'source' => 'WEBSITE',
    'score' => $score,
    'temperature' => $temperature,
    'status' => 'NEW',
    'ip' => $ip,
];

function storeLead(string $dir, array $lead): bool
{
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false;
    }
    $line = json_encode($lead, JSON_UNESCAPED_UNICODE);
    if ($line === false) {
        return false;
    }
    return @file_put_contents($dir . '/leads.jsonl', $line . "\n", FILE_APPEND | LOCK_EX) !== false;
}

$stored = storeLead($storageDir, $lead);

// ── Telegram ────────────────────────────────────────────────────────────────
function notifyTelegram(string $token, string $chatId, array $lead, bool $stored): bool
{
    if ($token === '' || $chatId === '') {
        return false;
    }

    $projectLabels = [
        'AI_AUTOMATION' => 'AI-бот и автоматизация',
        'MOBILE' => 'Мобильное приложение',
        'MINIAPP' => 'Telegram Mini App',
        'WEBSITE' => 'Сайт / лендинг',
        'CRM' => 'CRM или админ-панель',
        'UNKNOWN' => 'Пока не знаю',
    ];
    $budgetLabels = [
        'UNDER_1M' => 'до 1 млн ₸',
        'FROM_1M_TO_3M' => '1–3 млн ₸',
        'FROM_3M_TO_10M' => '3–10 млн ₸',
        'OVER_10M' => 'более 10 млн ₸',
        'UNKNOWN' => 'ещё не определён',
    ];

    $esc = static fn (string $v): string => htmlspecialchars($v, ENT_NOQUOTES, 'UTF-8');
    $heat = $lead['temperature'] === 'HOT' ? '🔥' : ($lead['temperature'] === 'WARM' ? '🟡' : '⚪️');

    $lines = [
        sprintf('%s <b>Новая заявка — %s (%d/100)</b>', $heat, $esc($lead['temperature']), $lead['score']),
        '',
        '<b>Имя:</b> ' . $esc($lead['name']),
    ];
    if ($lead['company'] !== null) {
        $lines[] = '<b>Компания:</b> ' . $esc($lead['company']);
    }
    $lines[] = '<b>WhatsApp:</b> ' . $esc($lead['phone']);
    $lines[] = '<b>Задача:</b> ' . $esc($projectLabels[$lead['project_type']]);
    $lines[] = '<b>Бюджет:</b> ' . $esc($budgetLabels[$lead['budget_range']]);
    if ($lead['message'] !== null) {
        $lines[] = "\n<b>Сообщение:</b>\n" . $esc($lead['message']);
    }
    if ($lead['page_url'] !== null) {
        $lines[] = "\n<i>Страница: " . $esc($lead['page_url']) . '</i>';
    }
    $lines[] = $stored
        ? '<i>ID: ' . $esc($lead['id']) . '</i>'
        : '<i>⚠️ На диск не записано</i>';
    $lines[] = '';
    $lines[] = '⏱ Ответить в течение 2 часов.';

    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => implode("\n", $lines),
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init('https://api.telegram.org/bot' . $token . '/sendMessage');
    if ($ch === false) {
        return false;
    }
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
    ]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    if ($response === false || $status < 200 || $status >= 300) {
        error_log('[leads] telegram failed: ' . $status . ' ' . (is_string($response) ? $response : curl_error($ch)));
        curl_close($ch);
        return false;
    }
    curl_close($ch);
    return true;
}

$notified = notifyTelegram($botToken, $chatId, $lead, $stored);

// Екі арна да істемесе — үнсіз жоғалтпаймыз, адал айтамыз.
if (!$stored && !$notified) {
    error_log('[leads] LOST LEAD, no sink available: ' . json_encode($lead, JSON_UNESCAPED_UNICODE));
    respond(503, [
        'ok' => false,
        'error' => 'Не удалось принять заявку. Напишите нам в WhatsApp — ответим сразу.',
    ]);
}

respond(200, ['ok' => true]);
