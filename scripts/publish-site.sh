#!/usr/bin/env bash
# Copies a built website (out/) into a checkout of this repo's gh-pages branch, the branch
# GitHub Pages serves noodlellm.com from, keeping what lives only there.
#
#     scripts/publish-site.sh out pages
#
# Kept: CNAME, .nojekyll and the password screen. While gate.js is there, every page loads it
# first and tells search engines to stay away, and robots.txt stays "Disallow: /". Deleting
# gate.js from the gh-pages branch is how the password comes off: the next publish then uses
# the build's own robots.txt and leaves the pages alone.
#
# Only copies; committing and pushing are up to the caller.
set -euo pipefail
out=${1:?built site, e.g. out}
dest=${2:?checkout of the gh-pages branch}
[ -f "$out/index.html" ] || { echo "no index.html in $out: build the site first" >&2; exit 1; }
[ -d "$dest/.git" ] || { echo "$dest is not a git checkout" >&2; exit 1; }

keep=$(mktemp -d)
trap 'rm -rf "$keep"' EXIT
for f in CNAME .nojekyll gate.js robots.txt; do
  [ -e "$dest/$f" ] && cp "$dest/$f" "$keep/"
done

find "$dest" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$out/." "$dest/"
for f in CNAME .nojekyll; do
  [ -e "$keep/$f" ] && cp "$keep/$f" "$dest/"
done

if [ -e "$keep/gate.js" ]; then
  cp "$keep/gate.js" "$dest/"
  [ -e "$keep/robots.txt" ] && cp "$keep/robots.txt" "$dest/"
  python3 - "$dest" <<'PY'
import pathlib, sys
tag = '<script src="/gate.js?v=3"></script><meta name="robots" content="noindex, nofollow"/>'
n = 0
for p in pathlib.Path(sys.argv[1]).rglob("*.html"):
    if ".git" in p.parts:
        continue
    s = p.read_text(encoding="utf-8")
    if "gate.js" in s or "<head>" not in s:
        continue
    i = s.index("<head>") + len("<head>")
    p.write_text(s[:i] + tag + s[i:], encoding="utf-8")
    n += 1
print(f"password screen on {n} pages")
PY
fi
