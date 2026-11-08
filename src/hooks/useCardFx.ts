import { useEffect, useLayoutEffect } from 'react';
import { site } from '../config';

const EASE = 'cubic-bezier(.2,.7,.2,1)';

type El = HTMLElement & { dataset: DOMStringMap };

/**
 * Pointer light (--mx / --my) and a slight 3D tilt on `[data-card]` elements.
 * One document listener, rAF-throttled.
 */
export function usePointerFx(reduced: boolean) {
  useEffect(() => {
    const fine = !!window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const canTilt = () => site.depth && !reduced && fine && window.innerWidth >= 1000;
    let pt: PointerEvent | null = null;
    let raf = 0;
    let cur: El | null = null;

    const release = (el: El) => {
      el.style.setProperty('--mx', '-600px');
      el.style.setProperty('--my', '-600px');
      if (el.dataset.rv !== 'wait') el.style.transform = '';
    };

    const tick = () => {
      raf = 0;
      const e = pt;
      if (!e) return;
      const t = e.target as Element | null;
      const el = (t && t.closest ? t.closest('[data-card]') : null) as El | null;
      if (cur && cur !== el) release(cur);
      cur = el;
      if (!el) return;
      const b = el.getBoundingClientRect();
      const x = e.clientX - b.left;
      const y = e.clientY - b.top;
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
      if (canTilt() && el.dataset.rv !== 'wait') {
        const k = Math.min(1, 360 / Math.max(b.width, b.height)) * 2.2;
        const rx = (0.5 - y / b.height) * k;
        const ry = (x / b.width - 0.5) * k;
        el.style.transform = `perspective(1400px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      pt = e;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget && cur) { release(cur); cur = null; }
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);
}

/**
 * Staggered, editorial entrance for `[data-reveal]` elements and the masked
 * `[data-line]` headline lines inside them. Re-runs when `key` (the route) changes.
 */
export function useReveal(key: string, reduced: boolean) {
  useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll<El>('[data-reveal]')).filter((el) => !el.dataset.rv);
    if (reduced || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => { el.dataset.rv = 'done'; });
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((en) => en.isIntersecting)
          .map((en) => en.target as El)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });
        vis.forEach((el, i) => {
          io.unobserve(el);
          const d = Math.min(i * 75, 600);
          el.style.transition = `opacity .9s ${EASE} ${d}ms, transform 1.1s ${EASE} ${d}ms`;
          el.querySelectorAll<HTMLElement>('[data-line]').forEach((l, j) => {
            l.style.transition = `transform 1.2s cubic-bezier(.19,1,.22,1) ${d + 160 + j * 100}ms`;
          });
          requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.querySelectorAll<HTMLElement>('[data-line]').forEach((l) => { l.style.transform = 'none'; });
          });
          timers.push(window.setTimeout(() => {
            el.dataset.rv = 'done';
            el.style.transition = `transform .8s ${EASE}`;
          }, d + 1200));
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px -20px 0px' },
    );
    els.forEach((el) => {
      el.dataset.rv = 'wait';
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.querySelectorAll<HTMLElement>('[data-line]').forEach((l) => { l.style.transform = 'translateY(110%)'; });
      io.observe(el);
    });
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      // Anything still mounted and mid-reveal is reset so a re-run can pick it up again.
      els.forEach((el) => {
        if (el.isConnected && el.dataset.rv === 'wait') {
          delete el.dataset.rv;
          el.style.opacity = '';
          el.style.transform = '';
          el.style.transition = '';
          el.querySelectorAll<HTMLElement>('[data-line]').forEach((l) => { l.style.transform = ''; l.style.transition = ''; });
        }
      });
    };
  }, [key, reduced]);
}
