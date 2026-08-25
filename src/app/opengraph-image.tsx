import { ImageResponse } from 'next/og';
import { SITE } from '@/content/site';

// Статикалық экспорт: сурет билд кезінде бір рет жасалады (ADR-0002b).
export const dynamic = 'force-static';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0B0D',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: '#FFB020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0B0D',
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 34, color: '#E8EAED', fontWeight: 600 }}>{SITE.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, color: '#E8EAED', fontWeight: 700, lineHeight: 1.15 }}>
            Digital-системы,
          </div>
          <div style={{ fontSize: 68, color: '#FFB020', fontWeight: 700, lineHeight: 1.15 }}>
            которые приносят деньги
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 72, height: 5, background: '#FFB020' }} />
          <div style={{ fontSize: 30, color: '#9BA1AA' }}>
            15 лет опыта · Алматы · nureke.kz
          </div>
        </div>
      </div>
    ),
    size,
  );
}
