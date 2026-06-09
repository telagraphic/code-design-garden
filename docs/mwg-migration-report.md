# MWG migration report

Generated: 2026-06-05

## Summary

| Slug | Tutorial # | mp4 | Tab blocks | Flags |
|------|------------|-----|------------|-------|
| weight-shift-marquee | 079 | no | 3 | external-relative-assets, club-gsap-splittext, mentions-lenis-smooth-scroll, no-tutorial-mp4 |
| matter-cursor-swarm | 080 | no | 3 | external-relative-assets, no-tutorial-mp4 |
| letter-by-letter-swap | 081 | no | 3 | external-relative-assets, club-gsap-splittext, mentions-lenis-smooth-scroll, no-tutorial-mp4 |
| upward-image-flow | 082 | no | 3 | external-relative-assets, mentions-lenis-smooth-scroll, no-tutorial-mp4 |
| pinned-multi-lane-drift | 083 | no | 3 | external-relative-assets, mentions-lenis-smooth-scroll, no-tutorial-mp4 |
| pinned-depth-rows | 084 | no | 3 | external-relative-assets, mentions-lenis-smooth-scroll, no-tutorial-mp4 |
| scroll-word-mask | 085 | no | 3 | external-relative-assets, mentions-lenis-smooth-scroll, no-tutorial-mp4 |
| cursor-insert-image-effect | 086 | no | 3 | external-relative-assets, no-tutorial-mp4 |
| staggered-card-motion | 087 | no | 3 | external-relative-assets, mentions-lenis-smooth-scroll, no-tutorial-mp4 |
| drag-gallery-reveal | 088 | no | 3 | external-relative-assets, no-tutorial-mp4 |
| jelly-headline-motion | 089 | yes | 3 | external-relative-assets |
| scrubbed-random-reveal | 090 | yes | 3 | external-relative-assets, club-gsap-splittext, mentions-lenis-smooth-scroll, slug-collision:scrubbed-random-reveal |
| 3d-wheel-gallery | 091 | yes | 3 | external-relative-assets |
| vanishing-mouse-trail | 092 | yes | 3 | external-relative-assets |
| letter-image-swap | 093 | yes | 3 | external-relative-assets |
| orbital-image-scroll | 094 | yes | 3 | external-relative-assets, mentions-lenis-smooth-scroll |
| bouncy-card-grid | 095 | yes | 3 | external-relative-assets |
| magnetic-image-reveal | 096 | yes | 3 | external-relative-assets |
| tightening-word-lines | 097 | yes | 3 | club-gsap-splittext, mentions-lenis-smooth-scroll |
| curved-scroll-reveal | 098 | yes | 3 | external-relative-assets, club-gsap-splittext, mentions-lenis-smooth-scroll |
| 3d-sphere | 099 | yes | 3 | external-relative-assets |
| orbital-scroll-gallery | 100 | yes | 3 | external-relative-assets |
| sine-wave-z-gallery | 101 | yes | 3 | external-relative-assets |
| 3d-title-flip | 102 | yes | 3 | slug-collision:3d-title-flip |

## Flag reference

- `external-relative-assets` — HTML references `./assets/…` (broken on site without assets)
- `club-gsap-splittext` — uses SplitText (Club GSAP plugin)
- `mentions-lenis-smooth-scroll` — tutorial mentions optional Lenis integration
- `no-tutorial-mp4` — no matching `Tutorial {N}.mp4` in mwg/
- `slug-collision:{slug}` — pilot entry with same slug already exists
- `missing-final-code-section` — no `## Final code` heading found

## Next steps

1. `pnpm astro sync`
2. `pnpm generate:animation-posters`
3. Review taxonomy and gallery ordering
4. Entries are written with `published: true` for local review
