# Repository Agent Guide

## Required run commands
When making changes, run these commands from `app/`:
- `npm install`
- `npm run dev`
- `npm run build`
- Run lint if/when a lint script exists in `package.json`.

## Motion and animation rules
- Motion is allowed by default to support rich visual storytelling.
- Every non-trivial animation must provide a `prefers-reduced-motion` fallback.
- Prefer performant properties (`transform`, `opacity`) and avoid layout-thrashing effects.
- Do not add heavy animation/rendering dependencies unless absolutely necessary (e.g. avoid `gsap`/`three` by default).

## Dynamic route params compatibility
- Ensure dynamic route params typing remains compatible with newer Next.js behavior.
- In routes where Next may provide async params, support `await params` style handling.
