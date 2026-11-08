/**
 * Site settings — the "Tweaks" panel from the design, as plain values.
 * Edit these, then rebuild.
 */
import arkofficeScreenshot from './assets/arkoffice-screenshot.webp';
import portrait from './assets/portrait.webp';

export const site = {
  /** Used by every email link and copy button. */
  email: 'lorcancreative@gmail.com',
  /** Full https:// URL. Leave empty to hide LinkedIn everywhere. */
  linkedinUrl: 'https://www.linkedin.com/in/lorcancreative/',
  /** Link to a CV file (public/ is served from the site root). Empty = buttons send an email asking for the CV. */
  cvUrl: 'Lorcan-ONeill-CV.pdf',

  /** Photos show in black and white and turn to colour on hover. */
  monochrome: true,
  /** Film grain over the whole page. */
  grain: true,
  /** Slight 3D tilt on card hover (desktop, fine pointer only). */
  depth: true,
};

/**
 * Photo slots. Import an image from ./assets and set it here; a slot left
 * undefined shows the quiet framed placeholder from the design.
 * `portrait` is shared by Home and About.
 */
export type Photo = { src: string; alt: string } | undefined;

export const photos: Record<'portrait' | 'homeFeatured' | 'homeVisual' | 'exp1' | 'exp2' | 'exp3', Photo> = {
  portrait: { src: portrait, alt: "Portrait of Lorcan O'Neill" },
  homeFeatured: undefined,
  homeVisual: { src: arkofficeScreenshot, alt: 'Screenshot of the Arkoffice website' },
  exp1: undefined,
  exp2: undefined,
  exp3: undefined,
};
