import { useSite } from '../site';
import { photos } from '../config';
import { ROMAN, STORY } from '../content';
import { Arrow, Card, Em, Line, Media, cell } from '../components/ui';

const lead = { flex: '1 1 300px', fontSize: 'clamp(17px,1.35vw,20px)', lineHeight: 1.55, letterSpacing: '-0.01em', color: 'var(--body-strong)' } as const;
const h3 = { fontSize: 'clamp(21px,1.75vw,26px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.18, color: 'var(--text)' } as const;
const place = { fontSize: 'clamp(24px,2.1vw,32px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 } as const;

export function About() {
  const { link } = useSite();
  return (
    <div className="grid" data-screen-label="About">
      <Card at="a_title" aria-labelledby="a-title" className="stack between" style={{ padding: 'var(--pad-lg)', gap: 'clamp(36px,5vw,72px)' }}>
        <span className="label">About</span>
        <h1 id="a-title" className="display" style={{ fontSize: 'clamp(52px,7.2vw,124px)', letterSpacing: '-0.055em', lineHeight: 0.92 }}>
          <Line>A little</Line>
          <Line><Em size="1.1em" style={{ letterSpacing: '-0.03em' }}>about</Em> me.</Line>
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px clamp(24px,4vw,64px)', paddingTop: 'clamp(20px,2vw,28px)', borderTop: '1px solid var(--hairline)' }}>
          <p className="pretty" style={lead}><span style={{ color: 'var(--text)' }}>I'm originally from Ireland</span> and spent close to a decade living and working in the Netherlands.</p>
          <p className="pretty" style={lead}>Along the way, I've worked across different creative and commercial environments, learning that the most interesting work rarely fits neatly into one job description.</p>
        </div>
      </Card>

      <figure data-card="" data-reveal="" className="photo cell" style={{ ...cell('a_portrait'), minHeight: 420 }}>
        <Media photo={photos.portrait} label="Portrait" labelSize="clamp(38px,3.4vw,56px)" hint="DROP A PHOTOGRAPH"
          bg="radial-gradient(120% 80% at 30% 0%,#1D3429 0%,#11201A 50%,#0B1612 100%)" />
        <span aria-hidden="true" className="photo-shade" style={{ background: 'linear-gradient(180deg,rgba(11,11,12,0) 60%,rgba(11,11,12,.75) 100%)' }} />
        <figcaption style={{ position: 'absolute', left: 22, right: 22, bottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, pointerEvents: 'none' }}>
          <span className="serif" style={{ fontSize: 26, lineHeight: 1 }}>Lorcan.</span>
          <span className="micro" style={{ color: '#B2C2BA' }}>IRELAND · NETHERLANDS</span>
        </figcaption>
      </figure>

      <Card at="a_places" aria-label="Ireland and the Netherlands" glow={[420, 0.045]} edge={[200, 0.3]} className="stack between"
        style={{ padding: 'var(--pad-sm)', gap: 28 }}>
        <span className="label">Two places</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div className="stack" style={{ gap: 8, minWidth: 0 }}>
            <span style={place}>Ireland</span>
            <span className="micro" style={{ color: 'var(--label)' }}>WHERE I'M FROM</span>
          </div>
          <span aria-hidden="true" style={{ flex: 1, minWidth: 24, height: 1, marginBottom: 30, background: 'linear-gradient(90deg,#2E5242,#34D399 50%,#2E5242)' }} />
          <div className="stack" style={{ gap: 8, alignItems: 'flex-end', textAlign: 'right', minWidth: 0 }}>
            <span style={place}>Netherlands</span>
            <span className="micro" style={{ color: 'var(--label)' }}>CLOSE TO A DECADE</span>
          </div>
        </div>
        <p className="pretty" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--body)' }}>An Irish ease with conversation. A Dutch habit of saying what you mean.</p>
      </Card>

      <Card as="figure" at="a_quote" alt edge={[200, 0.32]} className="stack between" style={{ margin: 0, padding: 'var(--pad-sm)', gap: 24 }}>
        <figcaption className="label">Something I've learned</figcaption>
        <blockquote className="serif balance" style={{ fontSize: 'clamp(25px,2.3vw,36px)', lineHeight: 1.1, letterSpacing: '-0.015em', color: 'var(--text)' }}>
          “The most interesting work rarely fits neatly into one job description.”
        </blockquote>
      </Card>

      <Card at="a_story" aria-labelledby="a-story" glow={[620, 0.035]} edge={[240, 0.28]} className="stack"
        style={{ padding: 'var(--pad-lg)', gap: 'clamp(24px,3vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 40px' }}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="label">How I got here</span>
            <h2 id="a-story" className="display" style={{ fontSize: 'clamp(32px,3.4vw,54px)', letterSpacing: '-0.045em', lineHeight: 1 }}>
              Not a straight <Em size="1.1em">line.</Em>
            </h2>
          </div>
          <p style={{ maxWidth: 320, fontSize: 15, lineHeight: 1.55, color: 'var(--muted)' }}>More a series of things I got curious about, and then got good at.</p>
        </div>
        <div className="stack">
          {STORY.map((s, i) => (
            <article key={s.title} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px clamp(20px,3vw,48px)', padding: 'clamp(18px,2vw,26px) 0', borderTop: '1px solid var(--line)' }}>
              <span aria-hidden="true" className="serif" style={{ flex: '0 0 44px', fontSize: 30, lineHeight: 1, color: 'var(--dim)' }}>{ROMAN[i]}</span>
              <h3 style={{ flex: '1 1 200px', fontSize: 'clamp(19px,1.5vw,22px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{s.title}</h3>
              <p className="pretty" style={{ flex: '1.6 1 300px', fontSize: 15, lineHeight: 1.62, color: 'var(--body)' }}>{s.text}</p>
            </article>
          ))}
        </div>
      </Card>

      <Card as="article" at="a_now" alt edge={[200, 0.32]} className="stack between" style={{ padding: 'var(--pad-sm)', gap: 24 }}>
        <span className="label with-dot"><span className="dot" />iv · Now</span>
        <div className="stack" style={{ gap: 12 }}>
          <h2 style={h3}>Conversations about AI</h2>
          <p className="pretty" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--body-strong)' }}>
            That curiosity led me to Arkintel, a Delft-based AI company. I work on the commercial side: talking with organisations, building relationships and helping explain why enterprise AI matters to the way they actually work.
          </p>
        </div>
      </Card>

      <Card as="a" at="a_teams" {...link('experience')} glow={[420, 0.045]} edge={[200, 0.3]} className="stack between arrow-host"
        style={{ padding: 'var(--pad-sm)', gap: 24 }}>
        <span className="label">v · How I like to work</span>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <span className="stack" style={{ gap: 12 }}>
            <span style={h3}>Small teams, real contribution.</span>
            <span className="pretty" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--body)' }}>I'm at my best where ideas move quickly and nobody hides behind a job title. If something needs doing and I can help, I'd rather pitch in.</span>
          </span>
          <Arrow variant="circle" box={44} />
        </span>
      </Card>

      <NextCard at="a_next" route="experience" eyebrow="Next chapter">
        Experience<span className="serif accent">.</span>
      </NextCard>
    </div>
  );
}

/** Full-width "next page" card with an oversized word that shifts on hover. */
export function NextCard({ at, route, eyebrow, children }: { at: 'a_next' | 'e_next'; route: 'experience' | 'contact'; eyebrow: string; children: React.ReactNode }) {
  const { link } = useSite();
  return (
    <Card as="a" at={at} {...link(route)} glow={[720, 0.04]} edge={[260, 0.3]} className="arrow-host"
      style={{ padding: 'var(--pad-lg)', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
      <span className="stack" style={{ gap: 'clamp(16px,2vw,28px)' }}>
        <span className="label">{eyebrow}</span>
        <span className="shift" style={{ fontSize: 'clamp(48px,7vw,120px)', fontWeight: 500, letterSpacing: '-0.055em', lineHeight: 0.9, color: 'var(--text)' }}>{children}</span>
      </span>
      <Arrow variant="circle" box="clamp(56px,5vw,72px)" size={20} stroke={1.8} />
    </Card>
  );
}
