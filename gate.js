/* Temporary password screen while the site is private. Not real security: the files are
   public on GitHub. Remove this file and the <script src="/gate.js"> tags to open the site. */
(function () {
  var KEY = "nllm_gate", HASH = "a00637d03d9f3900aeb23e8172d53299eb4a44d8b338c4f071cf1240a0b03c2d";
  try { if (localStorage.getItem(KEY) === HASH) return; } catch (e) {}
  var root = document.documentElement;
  root.style.visibility = "hidden";
  // Plain SHA-256, because crypto.subtle only exists on HTTPS pages and the site can be
  // reached over plain http too.
  function sha256(str) {
    var K = [], H = [], i, j, p = 2;
    function frac(x) { return ((x - Math.floor(x)) * 4294967296) | 0; }
    for (var n = 0; n < 64; p++) {
      for (j = 2; j * j <= p; j++) if (p % j === 0) break;
      if (j * j > p) { if (n < 8) H[n] = frac(Math.pow(p, 1 / 2)); K[n++] = frac(Math.pow(p, 1 / 3)); }
    }
    var bytes = unescape(encodeURIComponent(str)), l = bytes.length, words = [];
    for (i = 0; i < l; i++) words[i >> 2] |= bytes.charCodeAt(i) << (24 - (i % 4) * 8);
    words[l >> 2] |= 0x80 << (24 - (l % 4) * 8);
    words[(((l + 8) >> 6) << 4) + 15] = l * 8;
    function r(x, c) { return (x >>> c) | (x << (32 - c)); }
    for (i = 0; i < words.length; i += 16) {
      var w = [], a = H.slice(0);
      for (j = 0; j < 64; j++) {
        if (j < 16) w[j] = words[i + j] | 0;
        else w[j] = (r(w[j - 2], 17) ^ r(w[j - 2], 19) ^ (w[j - 2] >>> 10)) + w[j - 7] + (r(w[j - 15], 7) ^ r(w[j - 15], 18) ^ (w[j - 15] >>> 3)) + w[j - 16] | 0;
        var t1 = a[7] + (r(a[4], 6) ^ r(a[4], 11) ^ r(a[4], 25)) + ((a[4] & a[5]) ^ (~a[4] & a[6])) + K[j] + w[j] | 0;
        var t2 = (r(a[0], 2) ^ r(a[0], 13) ^ r(a[0], 22)) + ((a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2])) | 0;
        a = [t1 + t2 | 0, a[0], a[1], a[2], a[3] + t1 | 0, a[4], a[5], a[6]];
      }
      for (j = 0; j < 8; j++) H[j] = H[j] + a[j] | 0;
    }
    return H.map(function (x) { return ("00000000" + (x >>> 0).toString(16)).slice(-8); }).join("");
  }
  function show() {
    var box = document.createElement("div");
    box.setAttribute("style", "visibility:visible;position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#0b0d10;color:#e8eaed;font:16px system-ui,sans-serif");
    box.innerHTML = '<form style="display:flex;flex-direction:column;gap:12px;width:280px"><div style="font-weight:600;font-size:18px">Noodle LLM</div><input type="text" placeholder="Password" autofocus autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" style="padding:10px 12px;border-radius:8px;border:1px solid #333;background:#15181d;color:inherit;font:inherit"><button style="padding:10px;border-radius:8px;border:0;background:#3b9eff;color:#0b0d10;font:inherit;font-weight:600;cursor:pointer">Enter</button><div class="err" style="color:#f28b82;font-size:14px;min-height:1em"></div></form>';
    document.body.appendChild(box);
    var form = box.querySelector("form"), input = box.querySelector("input"), err = box.querySelector(".err");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      (function () {
        if (sha256(input.value.trim()) === HASH) {
          try { localStorage.setItem(KEY, HASH); } catch (e) {}
          box.remove();
          root.style.visibility = "";
        } else {
          err.textContent = "Wrong password";
          input.select();
        }
      })();
    });
  }
  if (document.body) show(); else document.addEventListener("DOMContentLoaded", show);
})();
