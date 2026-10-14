# noodlellm.com

The website for Noodle LLM: a Next.js static export. The desktop app lives in
[HearthLabs/noodlellm](https://github.com/HearthLabs/noodlellm).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Branches

- `main` is the website's source.
- `gh-pages` is the built site that GitHub Pages serves. Do not edit it by hand: every push
  to `main` rebuilds it (`.github/workflows/publish.yml`), keeping `CNAME`, `.nojekyll` and,
  while the site is private, `gate.js` and its `robots.txt`.

## Installers

The download buttons link to this repo's GitHub Releases (`NoodleLLM-Setup.exe`,
`NoodleLLM-mac.dmg`), so releases stay here.
