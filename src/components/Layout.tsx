import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useSite } from '../site';
import { ROMAN, ROUTES } from '../content';
import { Arrow } from './ui';

function useNarrow() {
  const q = '(max-width: 899.98px)';
  const [narrow, setNarrow] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setNarrow(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return narrow;
}

function Wordmark() {
  const { link } = useSite();
  return (
    <a {...link('home')} aria-label="Lorcan O'Neill — home" className="pill wordmark">
      <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.025em' }}>Lorcan</span>
      <span className="serif accent" style={{ fontSize: 21, lineHeight: 1 }}>O'Neill</span>
    </a>
  );
}

function DesktopNav() {
  const { to, link } = useSite();
  const nav = useRef<HTMLElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0, o: 0 });

  const measure = useCallback(() => {
    const a = nav.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!a) return;
    setInd((i) => (i.x === a.offsetLeft && i.w === a.offsetWidth && i.o ? i : { x: a.offsetLeft, w: a.offsetWidth, o: 1 }));
  }, []);

  useLayoutEffect(measure, [to, measure]);
  useEffect(() => {
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <>
      <nav ref={nav} aria-label="Primary" className="pill nav">
        <span aria-hidden="true" className="nav-ind" style={{ left: ind.x, width: ind.w, opacity: ind.o }} />
        {ROUTES.map((r) => (
          <a key={r.id} {...link(r.id)} aria-current={to === r.id ? 'page' : undefined}>{r.label}</a>
        ))}
      </nav>
      <a {...link('contact')} className="btn btn--light arrow-host cta">
        <span>Get in touch</span>
        <Arrow variant="chip" box={40} />
      </a>
    </>
  );
}

function MobileNav() {
  const { to, link, email, mailto, navigate } = useSite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  return (
    <>
      <button
        type="button"
        className="pill burger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span /><span />
      </button>
      <nav id="mobile-menu" aria-label="Mobile" aria-hidden={!open} inert={!open} className={'mmenu' + (open ? ' open' : '')}>
        <div className="stack">
          {ROUTES.map((r, i) => {
            const l = link(r.id);
            return (
              <a
                key={r.id}
                href={l.href}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  setOpen(false);
                  navigate(r.id);
                }}
                aria-current={to === r.id ? 'page' : undefined}
                className="mmenu-link"
                style={{ ['--d' as string]: (open ? 80 + i * 60 : 0) + 'ms' }}
              >
                <span className="n">{ROMAN[i]}</span>
                <span className="t">{r.label}</span>
              </a>
            );
          })}
        </div>
        <div className="mmenu-foot">
          <a href={mailto}>{email}</a>
          <span>IRELAND · THE NETHERLANDS</span>
        </div>
      </nav>
    </>
  );
}

function Footer() {
  const { link, reduced } = useSite();
  return (
    <footer className="footer">
      <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--muted)', fontSize: 13 }}>
        © {new Date().getFullYear()} Lorcan <span className="serif" style={{ fontSize: 16, color: 'var(--text-3)' }}>O'Neill</span>
      </span>
      <nav aria-label="Footer" className="footer-links">
        {ROUTES.map((r) => <a key={r.id} {...link(r.id)}>{r.label}</a>)}
      </nav>
      <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}>
        BACK TO TOP <span aria-hidden="true">↑</span>
      </button>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { leaving } = useSite();
  const narrow = useNarrow();
  return (
    <div className="page">
      <a href="#main" className="skip">Skip to content</a>
      <div className="frame">
        <header className="header">
          <Wordmark />
          {narrow ? <MobileNav /> : <DesktopNav />}
        </header>
        <main id="main" tabIndex={-1} className={leaving ? 'leaving' : undefined}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
