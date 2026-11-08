import { createElement, type CSSProperties, type ReactNode, type HTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { L, type CellKey } from '../content';
import type { Photo } from '../config';

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** CSS custom properties that place an element on the responsive bento grid. */
export function cell(key: CellKey): Vars {
  const [c0, r0, t, m] = L[key];
  const span = (n: number) => (n > 1 ? `span ${n}` : 'auto');
  return {
    '--c0': c0, '--r0': r0,
    '--c1': `span ${t[0]}`, '--r1': span(t[1]),
    '--c2': `span ${m[0]}`, '--r2': span(m[1]),
  };
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

type CardProps = {
  as?: 'section' | 'article' | 'figure' | 'a' | 'div';
  at?: CellKey;
  alt?: boolean;
  /** Radius / alpha of the surface light that follows the pointer. */
  glow?: [number, number];
  /** Radius / alpha of the light on the border. */
  edge?: [number, number];
  reveal?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'style' | 'className'> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'>;

/** Dark surface card with pointer lighting, border glow, tilt and scroll reveal hooks. */
export function Card({ as = 'section', at, alt, glow, edge, reveal = true, className, style, children, ...rest }: CardProps) {
  const vars: Vars = { ...(at ? cell(at) : {}), ...style };
  if (glow) { vars['--glow-r'] = glow[0] + 'px'; vars['--glow-a'] = glow[1]; }
  if (edge) { vars['--edge-r'] = edge[0] + 'px'; vars['--edge-a'] = edge[1]; }
  return createElement(
    as,
    {
      ...rest,
      'data-card': '',
      'data-reveal': reveal ? '' : undefined,
      className: cx('card', alt && 'card--alt', at && 'cell', className),
      style: vars,
    },
    <span aria-hidden="true" className="card-edge" />,
    children,
  );
}

/** One line of a headline that slides up inside a mask on reveal. */
export function Line({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className="line-mask">
      <span data-line="" className={className} style={style}>{children}</span>
    </span>
  );
}

/** Italic serif accent word. */
export function Em({ children, size = '1.12em', style }: { children: ReactNode; size?: string; style?: CSSProperties }) {
  return <span className="serif accent" style={{ fontSize: size, ...style }}>{children}</span>;
}

const ARROW_PATH = 'M7 17 17 7M8 7h9v9';

/** Diagonal arrow that swaps out on hover/focus of the nearest `.arrow-host`. */
export function Arrow({ variant, box, size = 14, stroke = 2 }: { variant: 'chip' | 'soft' | 'circle' | 'glass'; box: number | string; size?: number; stroke?: number }) {
  const svg = (k: string) => (
    <svg className={k} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ margin: `${-size / 2}px 0 0 ${-size / 2}px` }}>
      <path d={ARROW_PATH} />
    </svg>
  );
  return (
    <span aria-hidden="true" className={`arrow arrow--${variant}`} style={{ width: box, height: box }}>
      {svg('a')}
      {svg('b')}
    </span>
  );
}

type Corner = 'tl' | 'tr' | 'br';

/** Photo surface: the supplied image, or the quiet framed placeholder from the design. */
export function Media({ photo, label, labelSize, hint, bg, corners = ['tl', 'tr'], padBottom, cornerInset }: {
  photo: Photo;
  label: string;
  labelSize: string;
  hint: string;
  bg: string;
  corners?: Corner[];
  padBottom?: number;
  cornerInset?: number;
}) {
  return (
    <div className="media">
      {photo ? (
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
      ) : (
        <div aria-hidden="true" className="ph" style={{ background: bg, paddingBottom: padBottom }}>
          {corners.map((c) => (
            <span key={c} className={`ph-corner ${c}`} style={cornerInset ? { width: 12, height: 12, [c[0] === 't' ? 'top' : 'bottom']: cornerInset, [c[1] === 'l' ? 'left' : 'right']: cornerInset } : undefined} />
          ))}
          <span className="ph-label" style={{ fontSize: labelSize }}>{label}</span>
          {/* Editing hint — only shown in development builds. */}
          {import.meta.env.DEV && <span className="ph-hint">{hint}</span>}
        </div>
      )}
    </div>
  );
}

/* ───────── Icons (outlined, monochrome) ───────── */
const icon = (w: number, sw: number, children: ReactNode) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
export const MailIcon = () => icon(24, 1.3, <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" /></>);
export const CopyIcon = ({ w = 22, sw = 1.3 }: { w?: number; sw?: number }) => icon(w, sw, <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></>);
export const CheckIcon = ({ w = 20, sw = 1.6 }: { w?: number; sw?: number }) => icon(w, sw, <path d="M5 12.5 10 17l9-10" />);
export const LinkedInIcon = () => icon(24, 1.3, <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5v6M11.5 16.5v-6M11.5 13.2a2.4 2.4 0 0 1 4.8 0v3.3" /><circle cx="8" cy="7.6" r=".7" fill="currentColor" stroke="none" /></>);
export const DocIcon = () => icon(22, 1.3, <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>);
