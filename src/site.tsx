import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { site } from './config';
import { ROUTES, type Route } from './content';

const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function parse(): Route {
  // Legacy design links used #/about — honour them.
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = (hash || window.location.pathname).replace(/^\/+|\/+$/g, '');
  return (['about', 'experience', 'contact'] as const).find((r) => r === path) ?? 'home';
}

const pathFor = (r: Route) => ROUTES.find((x) => x.id === r)!.path;

type SiteCtx = {
  /** Route currently rendered. */
  route: Route;
  /** Route being navigated to (drives nav highlight during the transition). */
  to: Route;
  leaving: boolean;
  navigate: (r: Route) => void;
  link: (r: Route) => { href: string; onClick: (e: MouseEvent) => void };
  email: string;
  mailto: string;
  copied: boolean;
  copyEmail: () => void;
  linkedin: string | null;
  cv: { href: string; external: boolean; label: string };
  reduced: boolean;
};

const Ctx = createContext<SiteCtx | null>(null);

export function useSite() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useSite outside SiteProvider');
  return c;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parse);
  const [to, setTo] = useState<Route>(route);
  const [leaving, setLeaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const state = useRef({ route, to, leaving });
  state.current = { route, to, leaving };
  const ft = useRef<number | undefined>(undefined);
  const ct = useRef<number | undefined>(undefined);
  const reduced = useMemo(reducedMotion, []);

  const go = useCallback(
    (r: Route) => {
      const s = state.current;
      if (r === s.route && !s.leaving) {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        return;
      }
      if (r === s.to && s.leaving) return;
      setTo(r);
      setLeaving(true);
      window.clearTimeout(ft.current);
      ft.current = window.setTimeout(() => {
        window.scrollTo(0, 0);
        setRoute(r);
        setLeaving(false);
      }, reduced ? 0 : 320);
    },
    [reduced],
  );

  const navigate = useCallback(
    (r: Route) => {
      const p = pathFor(r);
      if (window.location.pathname !== p || window.location.hash) {
        try { history.pushState(null, '', p); } catch { /* ignore */ }
      }
      go(r);
    },
    [go],
  );

  const links = useRef<Partial<Record<Route, { href: string; onClick: (e: MouseEvent) => void }>>>({});
  const link = useCallback(
    (r: Route) => {
      if (!links.current[r]) {
        links.current[r] = {
          href: pathFor(r),
          onClick: (e: MouseEvent) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            navigate(r);
          },
        };
      }
      return links.current[r]!;
    },
    [navigate],
  );

  useEffect(() => {
    // Normalise a legacy #/route URL into a real path.
    if (/^#\//.test(window.location.hash)) {
      try { history.replaceState(null, '', pathFor(parse())); } catch { /* ignore */ }
    }
    const onPop = () => {
      const r = parse();
      if (r !== state.current.route || state.current.leaving) go(r);
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
      window.clearTimeout(ft.current);
      window.clearTimeout(ct.current);
    };
  }, [go]);

  const email = site.email.trim();
  const mailto = 'mailto:' + email;

  const copyEmail = useCallback(() => {
    const done = () => {
      setCopied(true);
      window.clearTimeout(ct.current);
      ct.current = window.setTimeout(() => setCopied(false), 2400);
    };
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) done();
        else window.location.href = mailto;
      } catch {
        window.location.href = mailto;
      }
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(email).then(done, fallback);
    else fallback();
  }, [email, mailto]);

  const li = site.linkedinUrl.trim();
  const linkedin = /^https?:\/\/[^\s]+\.[^\s]+/i.test(li) ? li : null;
  const cvUrl = site.cvUrl.trim();
  const cv = {
    href: cvUrl || mailto + '?subject=' + encodeURIComponent('CV request'),
    external: !!cvUrl,
    label: cvUrl ? 'Download CV' : 'Request my CV',
  };

  const value: SiteCtx = { route, to, leaving, navigate, link, email, mailto, copied, copyEmail, linkedin, cv, reduced };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
