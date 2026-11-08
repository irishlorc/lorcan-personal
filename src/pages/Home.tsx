import { useState } from 'react';
import { useSite } from '../site';
import { photos } from '../config';
import { ROMAN, THREADS } from '../content';
import { Arrow, Card, CheckIcon, CopyIcon, DocIcon, Em, Line, LinkedInIcon, MailIcon, Media, cell } from '../components/ui';
import { CopyButton } from '../components/CopyButton';

export function Home() {
  const { link, mailto, email, copied, copyEmail, linkedin, cv } = useSite();
  const [thread, setThread] = useState(0);

  return (
    <div className="grid" data-screen-label="Home">
      {/* 1 — Introduction */}
      <Card at="h_intro" aria-labelledby="h-title" className="stack between"
        style={{ padding: 'clamp(24px,3.2vw,52px)', gap: 'clamp(32px,4vw,56px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px 16px' }}>
          <span className="label">Creative · Commercial · Communication</span>
          <span className="label with-dot"><span className="dot" />Ireland · Netherlands</span>
        </div>
        <div>
          <p style={{ margin: '0 0 clamp(14px,1.4vw,22px)', fontSize: 'clamp(18px,1.5vw,23px)', letterSpacing: '-0.015em', color: 'var(--body)' }}>Hi, I'm Lorcan —</p>
          <h1 id="h-title" className="display" style={{ fontSize: 'clamp(42px,4.5vw,76px)', letterSpacing: '-0.048em', lineHeight: 0.98 }}>
            <Line>Creative by background.</Line>
            <Line><Em style={{ letterSpacing: '-0.025em' }}>Commercial</Em> by instinct.</Line>
          </h1>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px 32px', paddingTop: 'clamp(20px,2vw,28px)', borderTop: '1px solid var(--hairline)' }}>
          <p className="pretty" style={{ maxWidth: 340, fontSize: 16, lineHeight: 1.55, color: 'var(--body)' }}>Working across design, communication, business and technology.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <a {...link('about')} className="btn btn--light has-chip arrow-host">
              <span>More about me</span>
              <Arrow variant="chip" box={40} />
            </a>
            <a {...link('contact')} className="btn btn--ghost">Say hello</a>
          </div>
        </div>
      </Card>

      {/* 2 — Portrait */}
      <figure data-card="" data-reveal="" className="photo cell" style={{ ...cell('h_portrait'), minHeight: 300 }}>
        <Media photo={photos.portrait} label="Portrait" labelSize="clamp(34px,3vw,48px)" hint="DROP A PHOTOGRAPH"
          bg="radial-gradient(120% 90% at 25% 0%,#252527 0%,#171718 52%,#111112 100%)" />
        <span aria-hidden="true" className="photo-shade" style={{ background: 'linear-gradient(180deg,rgba(11,11,12,0) 58%,rgba(11,11,12,.72) 100%)' }} />
        <figcaption style={{ position: 'absolute', left: 20, right: 20, bottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, pointerEvents: 'none' }}>
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>Lorcan O'Neill</span>
          <span className="micro" style={{ letterSpacing: '.18em', color: '#B5B5B5' }}>IE · NL</span>
        </figcaption>
      </figure>

      {/* 3 — Elsewhere */}
      <nav data-reveal="" aria-label="Elsewhere" className="cell" style={{ ...cell('h_social'), display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
        <a data-card="" href={mailto} aria-label="Email Lorcan" title="Email" className="tile"><MailIcon /></a>
        <button data-card="" type="button" onClick={copyEmail} aria-label={copied ? 'Email address copied' : 'Copy email address'} title="Copy email address" className="tile">
          {copied ? <span className="copied-mark"><CheckIcon />COPIED</span> : <CopyIcon />}
        </button>
        {linkedin && (
          <a data-card="" href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn" className="tile"><LinkedInIcon /></a>
        )}
        <a data-card="" href={cv.href} target={cv.external ? '_blank' : undefined} rel="noopener" aria-label={cv.label} title={cv.label} className="tile"><DocIcon /></a>
        {!linkedin && (
          <div className="tile--empty">
            <span className="serif" style={{ fontSize: 22, lineHeight: 1, color: 'var(--text-3)' }}>IE·NL</span>
          </div>
        )}
      </nav>

      {/* 4 — Currently */}
      <Card as="a" at="h_current" {...link('experience')} glow={[420, 0.045]} edge={[200, 0.3]} className="stack between arrow-host"
        style={{ padding: 'clamp(20px,1.8vw,28px)', gap: 24 }}>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span className="label with-dot"><span className="dot" />Currently</span>
          <Arrow variant="circle" box={40} size={13} />
        </span>
        <span className="pretty" style={{ fontSize: 'clamp(17px,1.3vw,20px)', lineHeight: 1.4, letterSpacing: '-0.012em', color: '#C9C9C9' }}>
          Working on the commercial side of <span className="serif" style={{ fontSize: '1.18em', color: 'var(--text)' }}>Arkintel</span>, a Delft-based European AI company.
        </span>
      </Card>

      {/* 5 — Experience threads */}
      <Card at="h_threads" aria-labelledby="h-exp" className="stack" style={{ padding: 'clamp(24px,2.8vw,40px)', gap: 'clamp(24px,3vw,40px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <span className="label">Experience</span>
          <a {...link('experience')} className="label underline-link">Full overview</a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '12px 20px' }}>
          <span aria-hidden="true" className="serif" style={{ fontSize: 'clamp(104px,10.5vw,176px)', lineHeight: 0.74, letterSpacing: '-0.04em', color: 'var(--text)' }}>10+</span>
          <h2 id="h-exp" className="balance" style={{ margin: '0 0 4px', maxWidth: 250, fontSize: 'clamp(17px,1.35vw,20px)', fontWeight: 400, letterSpacing: '-0.012em', lineHeight: 1.35, color: 'var(--text-3)' }}>
            <span className="sr-only">10+ </span>years across creative, commercial and digital work.
          </h2>
        </div>
        <div className="stack" style={{ marginTop: 'auto', borderBottom: '1px solid var(--line)' }}>
          {THREADS.map((t, i) => {
            const on = thread === i;
            const pick = () => setThread(i);
            return (
              <div key={t.title} style={{ borderTop: '1px solid var(--line)' }}>
                <button type="button" className="thread-btn" onMouseEnter={pick} onFocus={pick} onClick={pick} aria-expanded={on} aria-controls={`thread-${i}`}>
                  <span className="n">{ROMAN[i]}</span>
                  <span className="t">{t.title}</span>
                  {t.tag && <span className="tag">{t.tag}</span>}
                </button>
                <div id={`thread-${i}`} className={'thread-body' + (on ? ' open' : '')}>
                  <div><p>{t.text}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 6 — Featured work */}
      <figure data-card="" data-reveal="" className="photo cell arrow-host" style={{ ...cell('h_featured'), minHeight: 420 }}>
        <Media photo={photos.homeFeatured} label="Featured work" labelSize="clamp(38px,3.4vw,56px)" hint="DROP A GENUINE PROJECT IMAGE" padBottom={90}
          bg="radial-gradient(110% 80% at 70% 10%,#262628 0%,#18181A 50%,#111112 100%)" />
        <span aria-hidden="true" className="photo-shade" style={{ background: 'linear-gradient(180deg,rgba(11,11,12,0) 45%,rgba(11,11,12,.55) 70%,rgba(11,11,12,.9) 100%)' }} />
        <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(20px,2.4vw,32px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, pointerEvents: 'none' }}>
          <span className="stack" style={{ gap: 12 }}>
            <span className="label" style={{ color: '#B5B5B5' }}>Selected work</span>
            <span className="balance" style={{ maxWidth: 360, fontSize: 'clamp(19px,1.6vw,24px)', fontWeight: 500, letterSpacing: '-0.022em', lineHeight: 1.22 }}>Creative, communication and technology — ten years of it.</span>
          </span>
          <a {...link('experience')} aria-label="See experience" style={{ pointerEvents: 'auto', borderRadius: '50%' }}>
            <Arrow variant="glass" box={48} />
          </a>
        </figcaption>
      </figure>

      {/* 7 — About */}
      <Card as="a" at="h_about" {...link('about')} glow={[420, 0.045]} edge={[200, 0.3]} className="stack between arrow-host"
        style={{ padding: 'clamp(22px,2.2vw,32px)', gap: 24 }}>
        <span className="label">About</span>
        <span className="stack" style={{ gap: 12 }}>
          <span className="balance" style={{ fontSize: 'clamp(21px,1.75vw,26px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.18 }}>
            A creative mind with a <Em>commercial</Em> instinct.
          </span>
          <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
            <span className="pretty" style={{ maxWidth: 260, fontSize: 14, lineHeight: 1.55, color: 'var(--muted)' }}>Multidisciplinary by habit. Always interested in the bigger picture.</span>
            <Arrow variant="circle" box={44} />
          </span>
        </span>
      </Card>

      {/* 8 — Second visual */}
      <figure data-card="" data-reveal="" className="photo cell" style={{ ...cell('h_visual'), minHeight: 160 }}>
        <Media photo={photos.homeVisual} label="Workspace" labelSize="clamp(28px,2.4vw,38px)" hint="DROP AN IMAGE" corners={['tl', 'br']}
          bg="radial-gradient(110% 90% at 80% 100%,#252527 0%,#171718 55%,#121213 100%)" />
      </figure>

      {/* 9 — Contact */}
      <Card at="h_contact" aria-labelledby="h-contact" glow={[720, 0.04]} edge={[260, 0.3]}
        style={{ padding: 'clamp(24px,3.4vw,56px)', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px 56px' }}>
        <div className="stack" style={{ flex: '1 1 520px', minWidth: 0, gap: 'clamp(20px,2.4vw,36px)' }}>
          <span className="label">Contact</span>
          <h2 id="h-contact" className="display" style={{ fontSize: 'clamp(38px,5vw,84px)', letterSpacing: '-0.048em', lineHeight: 0.98 }}>
            <Line>Good conversations</Line>
            <Line className="serif accent" style={{ fontSize: '1.1em', letterSpacing: '-0.025em' }}>start somewhere.</Line>
          </h2>
        </div>
        <div className="stack" style={{ flex: '0 1 auto', alignItems: 'flex-start', gap: 18 }}>
          <a href={mailto} className="underline-link" style={{ fontSize: 'clamp(17px,1.4vw,21px)', letterSpacing: '-0.01em' }}>{email}</a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <CopyButton />
            <a {...link('contact')} className="btn btn--ghost bare">Contact page</a>
          </div>
        </div>
      </Card>
    </div>
  );
}
