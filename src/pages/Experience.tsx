import { useSite } from '../site';
import { photos } from '../config';
import { AREAS, ROLES, ROMAN, TRAITS } from '../content';
import { Arrow, Card, Em, Line, Media, cell } from '../components/ui';
import { NextCard } from './About';

export function Experience() {
  const { cv } = useSite();
  return (
    <div className="grid" data-screen-label="Experience">
      <Card at="e_title" aria-labelledby="e-title" className="stack between" style={{ padding: 'var(--pad-lg)', gap: 'clamp(32px,4vw,56px)' }}>
        <span className="label">Experience</span>
        <h1 id="e-title" className="display" style={{ fontSize: 'clamp(40px,5vw,86px)', letterSpacing: '-0.05em', lineHeight: 0.96 }}>
          <Line>A varied background.</Line>
          <Line className="serif accent" style={{ fontSize: '1.1em', letterSpacing: '-0.025em' }}>A connected way of thinking.</Line>
        </h1>
        <p className="pretty" style={{ maxWidth: 560, paddingTop: 'clamp(20px,2vw,28px)', borderTop: '1px solid var(--hairline)', fontSize: 'clamp(16px,1.3vw,19px)', lineHeight: 1.55, letterSpacing: '-0.01em', color: 'var(--body-strong)' }}>
          More than ten years across creative, commercial and, most recently, technology work. Different rooms, same habit: work out what matters, then make it clear.
        </p>
      </Card>

      <Card at="e_years" alt aria-label="Years of experience" edge={[200, 0.32]}
        className="stack between" style={{ padding: 'var(--pad-sm)', gap: 20 }}>
        <span className="label">Years</span>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <span className="serif" style={{ fontSize: 'clamp(88px,8vw,140px)', lineHeight: 0.74, letterSpacing: '-0.04em' }}>10+</span>
          <span style={{ maxWidth: 150, fontSize: 14, lineHeight: 1.45, color: 'var(--body-strong)', textAlign: 'right' }}>Creative, commercial and digital.</span>
        </span>
      </Card>

      <Card as="a" at="e_cv" href={cv.href} target={cv.external ? '_blank' : undefined} rel="noopener" glow={[420, 0.045]} edge={[200, 0.3]}
        className="stack between arrow-host" style={{ padding: 'var(--pad-sm)', gap: 24 }}>
        <span className="label">The full picture</span>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <span className="stack" style={{ gap: 8 }}>
            <span className="balance" style={{ fontSize: 'clamp(19px,1.55vw,23px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.22 }}>The full CV: roles, dates and education.</span>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>{cv.label}</span>
          </span>
          <Arrow variant="circle" box={44} />
        </span>
      </Card>

      <section data-reveal="" aria-labelledby="e-areas" className="card card--plain cell stack"
        style={{ ...cell('e_areas'), padding: 'var(--pad-lg)', gap: 'clamp(24px,3vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px 32px' }}>
          <h2 id="e-areas" className="display" style={{ fontSize: 'clamp(28px,2.8vw,44px)', letterSpacing: '-0.04em', lineHeight: 1 }}>Three threads.</h2>
          <span className="label">Creative → Commercial → Technology</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,2.4vw,36px)' }}>
          {AREAS.map((a, i) => (
            <article key={a.title} className="stack" style={{ flex: '1 1 300px', minWidth: 0, gap: 16 }}>
              <div data-card="" className="photo" style={{ aspectRatio: '16 / 10', maxHeight: 260, borderRadius: 18 }}>
                <Media photo={photos[a.photo]} label={a.media} labelSize="30px" hint="DROP GENUINE WORK" corners={['tl', 'br']} cornerInset={14}
                  bg="radial-gradient(120% 90% at 30% 0%,#1B3128 0%,#11201A 55%,#0C1813 100%)" />
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, paddingTop: 8 }}>
                <span aria-hidden="true" className="serif" style={{ fontSize: 26, lineHeight: 1, color: 'var(--dim)' }}>{ROMAN[i]}</span>
                {a.tag && <span className="tag">{a.tag}</span>}
              </div>
              <h3 style={{ fontSize: 'clamp(21px,1.75vw,26px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.15 }}>{a.title}</h3>
              <p className="pretty" style={{ fontSize: 15, lineHeight: 1.62, color: 'var(--body)' }}>{a.text}</p>
              <p style={{ margin: 'auto 0 0', paddingTop: 14, borderTop: '1px solid var(--hairline)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.06em', lineHeight: 1.8, color: 'var(--muted)' }}>{a.keys}</p>
            </article>
          ))}
        </div>
      </section>

      <Card at="e_roles" aria-labelledby="e-roles" glow={[620, 0.035]} edge={[240, 0.28]} className="stack"
        style={{ padding: 'var(--pad-lg)', gap: 'clamp(24px,3vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 40px' }}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="label">Where I've worked</span>
            <h2 id="e-roles" className="display" style={{ fontSize: 'clamp(32px,3.4vw,54px)', letterSpacing: '-0.045em', lineHeight: 1 }}>
              The <Em size="1.1em">rooms.</Em>
            </h2>
          </div>
          <a href={cv.href} target={cv.external ? '_blank' : undefined} rel="noopener" className="label underline-link">{cv.label}</a>
        </div>
        <ol className="stack" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {ROLES.map((r) => (
            <li key={r.company} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px clamp(20px,3vw,48px)', padding: 'clamp(18px,2vw,26px) 0', borderTop: '1px solid var(--line)' }}>
              <span className={r.now ? 'micro with-dot' : 'micro'} style={{ flex: '0 0 170px', paddingTop: 6, color: r.now ? 'var(--text-2)' : 'var(--label)' }}>
                {r.now && <span className="dot" />}{r.dates.toUpperCase()}
              </span>
              <h3 style={{ flex: '1 1 240px', fontSize: 'clamp(19px,1.5vw,22px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                {r.role}
                <span style={{ display: 'block', marginTop: 4 }}><Em size="1.1em">{r.company}</Em></span>
              </h3>
              <p className="pretty" style={{ flex: '1.6 1 320px', fontSize: 15, lineHeight: 1.62, color: 'var(--body)' }}>{r.text}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card at="e_bring" alt aria-labelledby="e-bring" glow={[520, 0.05]} edge={[220, 0.32]} className="stack between"
        style={{ padding: 'var(--pad-lg)', gap: 32 }}>
        <span className="label">Six things</span>
        <div className="stack" style={{ gap: 18 }}>
          <h2 id="e-bring" className="display" style={{ fontSize: 'clamp(34px,3.6vw,60px)', letterSpacing: '-0.048em', lineHeight: 0.98 }}>
            <Line>What I bring</Line>
            <Line className="serif accent" style={{ fontSize: '1.1em' }}>to a team.</Line>
          </h2>
          <p style={{ maxWidth: 320, fontSize: 15, lineHeight: 1.55, color: 'var(--body-strong)' }}>Less a list of skills. More what tends to happen when I'm in the room.</p>
        </div>
      </Card>

      {TRAITS.map((t, i) => (
        <Card key={t.title} as="article" at={t.cell} glow={[420, 0.045]} edge={[200, 0.3]} className="stack between"
          style={{ padding: 'var(--pad-sm)', gap: 24 }}>
          <span aria-hidden="true" className="serif" style={{ fontSize: 'clamp(36px,3vw,48px)', lineHeight: 0.8, color: '#426352' }}>{ROMAN[i]}.</span>
          <div className="stack" style={{ gap: 10 }}>
            <h3 style={{ fontSize: 'clamp(19px,1.5vw,22px)', fontWeight: 500, letterSpacing: '-0.02em' }}>{t.title}</h3>
            <p className="pretty" style={{ maxWidth: 440, fontSize: 15, lineHeight: 1.6, color: 'var(--body)' }}>{t.text}</p>
          </div>
        </Card>
      ))}

      <NextCard at="e_next" route="contact" eyebrow="Sound useful?">
        Let's <Em size="1em">talk.</Em>
      </NextCard>
    </div>
  );
}
