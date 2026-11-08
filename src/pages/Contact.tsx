import { useEffect, useState } from 'react';
import { useSite } from '../site';
import { Arrow, Card, Line } from '../components/ui';
import { CopyButton } from '../components/CopyButton';

function useNow(ms: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), ms);
    return () => window.clearInterval(t);
  }, [ms]);
  return now;
}

const time = (now: number, tz: string) => {
  try { return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date(now)); }
  catch { return '—'; }
};

export function Contact() {
  const { link, mailto, email, linkedin, cv } = useSite();
  const now = useNow(20000);
  const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '10px 0', borderTop: '1px solid var(--line-2)' } as const;
  const clock = { fontSize: 'clamp(22px,1.9vw,28px)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' } as const;
  const smallTitle = { fontSize: 'clamp(20px,1.7vw,25px)', fontWeight: 500, letterSpacing: '-0.022em', lineHeight: 1.2 } as const;

  return (
    <div className="grid" data-screen-label="Contact">
      <Card at="c_main" aria-labelledby="c-title" glow={[820, 0.04]} edge={[280, 0.3]} className="stack between"
        style={{ padding: 'clamp(24px,4vw,64px)', gap: 'clamp(40px,5vw,80px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          <span className="label">Contact</span>
          <span className="label">Email is best</span>
        </div>
        <h1 id="c-title" className="display" style={{ fontSize: 'clamp(50px,8.4vw,150px)', letterSpacing: '-0.058em', lineHeight: 0.9 }}>
          <Line>Good conversations</Line>
          <Line className="serif accent" style={{ fontSize: '1.1em', letterSpacing: '-0.03em' }}>start somewhere.</Line>
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px 48px', paddingTop: 'clamp(24px,2.4vw,36px)', borderTop: '1px solid var(--hairline)' }}>
          <div className="stack" style={{ flex: '1 1 420px', minWidth: 0, gap: 22 }}>
            <p className="pretty" style={{ maxWidth: 540, fontSize: 'clamp(16px,1.3vw,19px)', lineHeight: 1.55, letterSpacing: '-0.01em', color: 'var(--body-strong)' }}>
              Whether you've got an interesting idea, a role worth discussing or simply think our paths should cross, feel free to get in touch.
            </p>
            <a href={mailto} className="underline-link contact-email">{email}</a>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <CopyButton large />
              <a href={mailto} className="btn btn--ghost btn--lg has-chip arrow-host bare">
                <span>Write an email</span>
                <Arrow variant="soft" box={38} size={13} />
              </a>
            </div>
          </div>
          <span className="serif accent" style={{ fontSize: 'clamp(56px,6vw,104px)', lineHeight: 0.8, letterSpacing: '-0.03em' }}>Lorcan.</span>
        </div>
      </Card>

      <Card as="a" at="c_link" href={linkedin ?? cv.href} target={linkedin || cv.external ? '_blank' : undefined} rel="noopener noreferrer"
        glow={[420, 0.045]} edge={[200, 0.3]} className="stack between arrow-host" style={{ padding: 'clamp(20px,2.2vw,32px)', gap: 20 }}>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span className="label">{linkedin ? 'LinkedIn' : 'CV'}</span>
          <Arrow variant="circle" box={40} size={13} />
        </span>
        <span style={smallTitle}>{linkedin ? 'Find me on LinkedIn.' : cv.external ? 'Download my CV.' : 'Request my CV.'}</span>
      </Card>

      <Card at="c_time" alt aria-label="Local time" edge={[200, 0.32]} className="stack between" style={{ padding: 'clamp(20px,2.2vw,32px)', gap: 20 }}>
        <span className="label">Local time</span>
        <div className="stack">
          <div style={row}>
            <span style={{ fontSize: 14, color: 'var(--body-strong)' }}>Ireland</span>
            <span style={clock}>{time(now, 'Europe/Dublin')}</span>
          </div>
          <div style={row}>
            <span style={{ fontSize: 14, color: 'var(--body-strong)' }}>Netherlands</span>
            <span style={clock}>{time(now, 'Europe/Amsterdam')}</span>
          </div>
        </div>
      </Card>

      <Card as="a" at="c_home" {...link('home')} glow={[520, 0.045]} edge={[220, 0.3]} className="stack between arrow-host"
        style={{ padding: 'clamp(20px,2.2vw,32px)', gap: 20 }}>
        <span className="label">Not quite yet?</span>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <span className="shift" style={smallTitle}>Back to the start.</span>
          <Arrow variant="circle" box={44} />
        </span>
      </Card>
    </div>
  );
}
