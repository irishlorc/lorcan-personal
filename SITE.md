# Lorcan O'Neill — website

Built from `project/Lorcan O'Neill v3.dc.html` (Claude Design handoff). Vite + React + TypeScript, static output.

    npm install
    npm run dev       # local dev server
    npm run build     # → dist/

## Things to set before going live — `src/config.ts`
- `email`: still the placeholder `hello@lorcanoneill.com`.
- `linkedinUrl`, `cvUrl`: empty hides LinkedIn / makes CV buttons send an email request.
- `photos`: drop images into `src/assets/`, import them and set the slot. Empty slots show the framed placeholder.
- `monochrome`, `grain`, `depth`: the design's Tweaks switches.

Copy lives in `src/content.ts`. Routes are real paths (`/about` …); `public/_redirects` (Netlify) and `vercel.json` send them all to `index.html`. Old `#/about` links redirect.
