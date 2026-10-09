/* Temporary password screen while the site is private. Not real security: the files are
   public on GitHub. Remove this file and the <script src="/gate.js"> tags to open the site. */
(function () {
  var KEY = "nllm_gate", HASH = "e9a76c3b09cfc7b72bbd66671106cc2e2ff9e87aa97d6bf24c15e887f3aba8c9";
  try { if (localStorage.getItem(KEY) === HASH) return; } catch (e) {}
  var root = document.documentElement;
  root.style.visibility = "hidden";
  function hex(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }
  function show() {
    var box = document.createElement("div");
    box.setAttribute("style", "visibility:visible;position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#0b0d10;color:#e8eaed;font:16px system-ui,sans-serif");
    box.innerHTML = '<form style="display:flex;flex-direction:column;gap:12px;width:280px"><div style="font-weight:600;font-size:18px">Noodle LLM</div><input type="password" placeholder="Password" autofocus style="padding:10px 12px;border-radius:8px;border:1px solid #333;background:#15181d;color:inherit;font:inherit"><button style="padding:10px;border-radius:8px;border:0;background:#3b9eff;color:#0b0d10;font:inherit;font-weight:600;cursor:pointer">Enter</button><div class="err" style="color:#f28b82;font-size:14px;min-height:1em"></div></form>';
    document.body.appendChild(box);
    var form = box.querySelector("form"), input = box.querySelector("input"), err = box.querySelector(".err");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(input.value)).then(function (d) {
        if (hex(d) === HASH) {
          try { localStorage.setItem(KEY, HASH); } catch (e) {}
          box.remove();
          root.style.visibility = "";
        } else {
          err.textContent = "Wrong password";
          input.select();
        }
      });
    });
  }
  if (document.body) show(); else document.addEventListener("DOMContentLoaded", show);
})();
