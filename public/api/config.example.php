<?php

declare(strict_types=1);

/**
 * Үлгі. Серверде осының көшірмесін `config.php` деп сақта да, мәндерін толтыр.
 *
 *   cp api/config.example.php api/config.php
 *
 * `config.php` репозиторийге ЕШҚАШАН кірмейді (.gitignore-де) және
 * .htaccess оны сырттан оқуға тыйым салады.
 */

return [
    // @BotFather берген токен. Бос болса — Telegram хабарламасы жіберілмейді,
    // өтінім тек дискіге жазылады.
    'telegram_bot_token' => '',

    // Хабарлама келетін чат. Өз ID-ыңды @userinfobot арқылы білуге болады.
    'telegram_chat_id' => '',

    // Өтінімдер сақталатын папка. МІНДЕТТІ ТҮРДЕ public_html-ден ТЫС болуы керек,
    // әйтпесе leads.jsonl файлын интернеттен оқып кетеді.
    // Әдепкі мән: public_html-мен қатар тұрған ../nureke-data
    // 'storage_dir' => '/home/КОЛДАНУШЫ/nureke-data',
];
