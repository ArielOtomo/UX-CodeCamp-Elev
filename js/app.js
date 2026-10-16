/* ==========================================================================
   UX-CodeCamp – app.js
   Ritar ut kapitlen från content-*.js och sköter sök, live-redigerare,
   och ljust/mörkt läge. Du behöver inte ändra här för att
   lägga till innehåll – redigera content-filerna istället.
   ========================================================================== */
(function () {
  "use strict";

  const { parts, chapters, library } = window.KURS;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------- Lagring (senaste kapitel + tema) ---------------- */
  const STORE_KEY = "uxcc-prova-v1";
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  let state = Object.assign({ theme: null, last: null, sidebarCollapsed: false }, load());
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* privat läge – ignorera */ }
  }

  /* ---------------- Hjälpfunktioner ---------------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escAttr = (s) => esc(s).replace(/"/g, "&quot;");
  const strip = (html) => String(html).replace(/<[^>]+>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/\s+/g, " ").trim();
  const chapterById = (id) => chapters.find((c) => c.id === id);
  // Alla block i ett kapitel, även de som ligger i en hopfälld fördjupning
  const allBlocks = (blocks) => blocks.flatMap((b) => (b.t === "more" ? [b, ...allBlocks(b.blocks)] : [b]));

  function highlight(code, lang) {
    const e = esc(code);
    if (lang === "html") {
      return e.replace(/(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?[\w!-]+)|(&gt;)|("[^"\n]*")|(\s[\w:-]+)(?==)/g,
        (m, com, tag, close, str, attr) => {
          if (com) return `<span class="tk-com">${com}</span>`;
          if (tag) return `<span class="tk-tag">${tag}</span>`;
          if (close) return `<span class="tk-tag">${close}</span>`;
          if (str) return `<span class="tk-str">${str}</span>`;
          if (attr) return `<span class="tk-attr">${attr}</span>`;
          return m;
        });
    }
    if (lang === "css") {
      return e.replace(/(\/\*[\s\S]*?\*\/)|("[^"\n]*")|(@[\w-]+)|([\w-]+)(?=:\s)/g,
        (m, com, str, at, prop) => {
          if (com) return `<span class="tk-com">${com}</span>`;
          if (str) return `<span class="tk-str">${str}</span>`;
          if (at) return `<span class="tk-tag">${at}</span>`;
          if (prop) return `<span class="tk-prop">${prop}</span>`;
          return m;
        });
    }
    return e;
  }

  /* ---------------- Tema ---------------- */
  function applyTheme() {
    const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = state.theme || (sysDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }
  $("#themeBtn").addEventListener("click", () => {
    const now = document.documentElement.getAttribute("data-theme");
    state.theme = now === "dark" ? "light" : "dark";
    save(); applyTheme();
  });
  applyTheme();

  /* ---------------- Sidomeny ---------------- */
  // Sidomenyn: grupperna är hopfällbara. Gruppen man befinner sig i är öppen, de andra stängda –
  // så att menyn inte visar allt på en gång. På startsidan är alla öppna.
  function renderToc(currentId) {
    let n = 0;
    const currentPart = (() => {
      if (currentId === "bibliotek") return "ref";
      const c = chapterById(currentId);
      return c ? c.part : null;
    })();
    const link = (href, id, dot, text, cls) => `<li><a class="toc-link ${cls || ""}" href="${href}" ${id === currentId ? 'aria-current="page"' : ""}>
          <span class="toc-dot">${dot}</span>${esc(text)}</a></li>`;
    const html = parts.map((p) => {
      let items = "";
      if (p.id === "ref") items = link("#/bibliotek", "bibliotek", "≡", "Snabbreferens");
      items += chapters.filter((c) => c.part === p.id).map((c) => {
        n++;
        return link(`#/${c.id}`, c.id, n, c.title);
      }).join("");
      const open = !currentPart || currentPart === p.id;
      return `<details class="toc-group" ${open ? "open" : ""}><summary>${esc(p.title)}</summary><ol>${items}</ol></details>`;
    }).join("");
    $("#toc").innerHTML = html;
  }

  /* Mobilmeny */
  const sidebar = $("#sidebar"), scrim = $("#scrim"), menuBtn = $("#menuBtn");
  // Ikonen visar en panel med pil: pil åt vänster = fäll ihop, pil åt höger = fäll ut
  function setMenuIcon(isOpen) { menuBtn.classList.toggle("is-open", isOpen); }
  function setMenu(open) {
    sidebar.classList.toggle("open", open);
    scrim.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    if (isMobile()) {
      setMenuIcon(open);
      menuBtn.setAttribute("aria-label", open ? "Stäng menyn" : "Öppna menyn");
      menuBtn.title = open ? "Stäng menyn" : "Öppna menyn";
    }
  }
  const isMobile = () => window.matchMedia("(max-width: 860px)").matches;
  const layout = $(".layout");
  function applySidebar() {
    const collapsed = !!state.sidebarCollapsed;
    layout.classList.toggle("collapsed", collapsed);
    if (isMobile()) {
      setMenuIcon(sidebar.classList.contains("open"));
    } else {
      setMenuIcon(!collapsed);
      menuBtn.setAttribute("aria-expanded", String(!collapsed));
      menuBtn.setAttribute("aria-label", collapsed ? "Visa sidomenyn" : "Dölj sidomenyn");
      menuBtn.title = collapsed ? "Visa sidomenyn" : "Dölj sidomenyn";
    }
  }
  menuBtn.addEventListener("click", () => {
    if (isMobile()) { setMenu(!sidebar.classList.contains("open")); return; }
    state.sidebarCollapsed = !state.sidebarCollapsed;   // desktop: fäll ihop/ut
    save(); applySidebar();
  });
  window.addEventListener("resize", applySidebar);
  applySidebar();
  scrim.addEventListener("click", () => setMenu(false));

  /* ---------------- Block-rendering ---------------- */
  let pgCount = 0;
  const playgrounds = [];

  function renderBlock(b) {
    switch (b.t) {
      case "h": return `<h2 id="${slug(b.text)}">${esc(b.text)}</h2>`;
      case "p": return `<p>${b.html}</p>`;
      case "list": {
        const tag = b.ordered ? "ol" : "ul";
        return `<${tag}>${b.items.map((i) => `<li>${i}</li>`).join("")}</${tag}>`;
      }
      case "code":
        return `<div class="code-block"><span class="code-label">${esc(b.lang)}</span>
          <button class="copy-btn" type="button">Kopiera</button>
          <pre><code>${highlight(b.code, b.lang)}</code></pre></div>`;
      case "tip": {
        const icon = { ux: "◆", info: "i", warn: "!" }[b.kind] || "i";
        const label = { ux: "UX-koppling", info: "Bra att veta", warn: "Se upp" }[b.kind] || "";
        return `<aside class="callout ${b.kind}" aria-label="${label}">
          <span class="callout-icon" aria-hidden="true">${icon}</span>
          <div><strong class="callout-title">${esc(b.title)}</strong>${b.html.startsWith("<") ? b.html : `<p>${b.html}</p>`}</div></aside>`;
      }
      case "table":
        return `<div class="table-wrap"><table><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
          <tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      case "play":
      case "ex": return renderPlayground(b);
      case "more":
        // Fördjupning: hopfällt innehåll för den som vill veta mer
        return `<details class="more"><summary><span class="more-icon" aria-hidden="true">+</span>${esc(b.title || "Vill du veta mer?")}</summary>
          <div class="more-body">${b.blocks.map(renderBlock).join("")}</div></details>`;
      case "diagram": return boxDiagram();
      case "anatomy":
        // Visar en kodrad uppdelad i färgade delar med etiketter under, t.ex. starttagg / innehåll / sluttagg
        return `<figure class="anatomy" aria-label="${escAttr(b.parts.map((x) => x[2] ? `${x[2]}: ${x[0]}` : x[0]).join(", "))}">
          <div class="anat-row">${b.parts.map(([code, kind, label]) => `<span class="anat-seg k-${kind}"><code>${esc(code)}</code>${label ? `<small>${esc(label)}</small>` : "<small>&nbsp;</small>"}</span>`).join("")}</div>
        </figure>`;
      default: return "";
    }
  }

  function slug(s) {
    return "s-" + s.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function boxDiagram() {
    return `<figure class="box-diagram" aria-label="Boxmodellen: margin ytterst, sedan border, padding och content innerst">
      <div class="bd margin"><span>margin</span>
        <div class="bd border"><span>border</span>
          <div class="bd padding"><span>padding</span>
            <div class="bd content">content</div>
          </div>
        </div>
      </div>
    </figure>`;
  }

  /* ---------------- Live-redigerare ----------------
     Varje kodexempel visas med flikar för HTML och CSS bredvid Resultat.
     Allt går att redigera – resultatet uppdateras direkt. */
  function renderPlayground(b) {
    const id = "pg" + (++pgCount);
    playgrounds.push({ id, b });
    // Två sorters kodrutor: Exempel (titta och testa) och Övning (gör själv)
    const badge = b.t === "ex" ? "Exempel" : "Övning";
    const kind = b.t === "ex" ? "is-example" : "is-exercise";
    const icon = b.t === "ex"
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;
    // Kodrutan får en höjd efter den längsta av HTML och CSS, så att den inte hoppar när man byter flik.
    const lines = (src) => String(src || "").split("\n").length + 1;
    const r = Math.min(24, Math.max(6, lines(b.html), lines(b.css)));
    return `<section class="playground ${kind}" id="${id}" aria-label="${badge}: ${escAttr(b.title)}">
      <div class="pg-head">
        <div class="pg-title"><span class="badge">${icon}${badge}</span>${esc(b.title)}</div>
        <div class="pg-actions">
          ${b.solution ? `<button class="btn" type="button" data-act="solution">Visa lösning</button>` : ""}
          <button class="btn icon-only" type="button" data-act="full" aria-pressed="false" title="Öppna i helskärm (Esc stänger)" aria-label="Öppna i helskärm">
            <svg class="i-expand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            <svg class="i-collapse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg>
            <span class="full-label">Stäng</span>
          </button>
          <button class="btn icon-only" type="button" data-act="reset" title="Återställ koden" aria-label="Återställ koden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>
      </div>
      ${isTypeAlong(b) ? renderSteps(b, id)
        : b.task ? `<div class="pg-task"><strong class="pg-task-label">${b.t === "ex" ? "Prova" : "Uppgift"}</strong> ${b.task}</div>` : ""}
      <div class="pg-body">
        <div class="pg-pane pg-code">
          <div class="pg-tabs" role="tablist" aria-label="Välj kod">
            <button class="pg-tab" role="tab" type="button" id="${id}-t-html" aria-controls="${id}-html" data-tab="html" aria-selected="${b.tab !== "css"}" ${b.tab === "css" ? 'tabindex="-1"' : ""}><span class="dot html"></span>HTML</button>
            <button class="pg-tab" role="tab" type="button" id="${id}-t-css" aria-controls="${id}-css" data-tab="css" aria-selected="${b.tab === "css"}" ${b.tab === "css" ? "" : 'tabindex="-1"'}><span class="dot css"></span>CSS</button>
          </div>
          <textarea class="pg-editor" id="${id}-html" role="tabpanel" aria-labelledby="${id}-t-html" data-lang="html" rows="${r}" spellcheck="false" ${b.tab === "css" ? "hidden" : ""}></textarea>
          <textarea class="pg-editor" id="${id}-css" role="tabpanel" aria-labelledby="${id}-t-css" data-lang="css" rows="${r}" spellcheck="false" ${b.tab === "css" ? "" : "hidden"}></textarea>
        </div>
        <div class="pg-pane pg-result">
          <div class="pg-label"><span class="dot res"></span>Resultat</div>
          <iframe class="pg-preview auto-h" title="Resultat: ${escAttr(b.title)}" sandbox="allow-scripts"></iframe>
        </div>
      </div>
    </section>`;
  }

  /* ---------------- Skriv av – ändra sedan ----------------
     I Exempel-rutorna börjar kodfliken tom. Eleven skriver av koden (steg 1)
     och ändrar den sedan (steg 2). Den andra fliken är redan ifylld.
     Exemplet går inte att kopiera. Egen kod får kopieras och klistras in igen:
     allt eleven kopierar eller klipper ut från en kodruta sparas i ownClips,
     och bara den texten släpps igenom vid inklistring. */
  const ownClips = new Set();
  const clipKey = (t) => String(t || "").replace(/\r/g, "").trim();
  ["copy", "cut"].forEach((ev) => document.addEventListener(ev, (e) => {
    const t = e.target;
    if (t && t.closest && t.closest(".pg-ref")) { e.preventDefault(); return; }   // exemplet: ingen kopiering
    if (t && t.classList && t.classList.contains("pg-editor")) {
      const txt = clipKey(t.value.slice(t.selectionStart, t.selectionEnd));
      if (txt) ownClips.add(txt);
    }
  }));
  const isOwnText = (txt) => { const k = clipKey(txt); return !k || ownClips.has(k); };
  const isTypeAlong = (b) => b.t === "ex";
  const mainLang = (b) => (b.tab === "css" ? "css" : "html");
  const stripComments = (code) => String(code).replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
  // Gör koden jämförbar: blanksteg runt tecken som { } : ; < > = spelar ingen roll, inte heller ' eller "
  function normLines(code, keepComments) {
    return (keepComments ? String(code) : stripComments(code)).split("\n")
      .map((l) => l.trim().replace(/\s+/g, " ").replace(/\s*([{}:;,<>=()\/])\s*/g, "$1").replace(/'/g, '"'))
      .filter(Boolean);
  }
  function compareCode(typed, ref, keepComments) {
    const a = normLines(typed, keepComments), r = normLines(ref, keepComments);
    for (let i = 0; i < r.length; i++) {
      if (a[i] === undefined) return { ok: false, missing: true, line: i + 1, total: r.length };
      if (a[i] !== r[i]) return { ok: false, line: i + 1, total: r.length, expected: r[i] };
    }
    if (a.length > r.length) return { ok: false, extra: true, total: r.length };
    return { ok: true, total: r.length };
  }
  function renderSteps(b, id) {
    const lang = mainLang(b);
    const ref = b[lang] || "";
    const hasComments = !b.keepComments && /<!--|\/\*/.test(ref);
    return `<div class="pg-task pg-steps">
      <div class="pg-step" data-step="1">
        <div class="pg-step-head">
          <span class="step-num" aria-hidden="true">1</span>
          <strong>Skriv av koden i ${lang.toUpperCase()}-fliken</strong>
          <span class="pg-step-status" id="${id}-status" role="status"></span>
        </div>
        <pre class="pg-ref" aria-label="Kod att skriva av"><code>${highlight(ref, lang)}</code></pre>
        <div class="pg-step-foot">
          <span class="pg-step-hint">${hasComments ? "Grå kommentarer behöver du inte skriva. " : ""}Skriv själv. Exemplet går inte att klistra in, men din egen kod kan du kopiera och klistra.</span>
          <button class="btn" type="button" data-act="check">Kontrollera</button>
        </div>
      </div>
      ${b.task ? `<div class="pg-step" data-step="2">
        <div class="pg-step-head"><span class="step-num" aria-hidden="true">2</span><strong>Ändra sedan</strong></div>
        <div class="pg-step-body">${b.task}</div>
      </div>` : ""}
    </div>`;
  }

  /* Helskärm: kodrutan läggs ovanpå sidan och fyller fönstret */
  let fullRoot = null;
  function toggleFull(root, btn) {
    const on = !root.classList.contains("is-full");
    if (fullRoot && fullRoot !== root) toggleFull(fullRoot, $('[data-act="full"]', fullRoot));
    root.classList.toggle("is-full", on);
    document.body.classList.toggle("has-full", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Stäng helskärm" : "Öppna i helskärm");
    btn.title = on ? "Stäng helskärm (Esc)" : "Öppna i helskärm (Esc stänger)";
    fullRoot = on ? root : null;
    if (on) { root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true"); $(".pg-editor:not([hidden])", root).focus(); }
    else { root.removeAttribute("role"); root.removeAttribute("aria-modal"); btn.focus(); }
  }
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !fullRoot) return;
    if (document.activeElement && document.activeElement.classList.contains("pg-editor")) return; // första Esc lämnar redigeraren
    toggleFull(fullRoot, $('[data-act="full"]', fullRoot));
  });
  document.addEventListener("click", (e) => {
    if (fullRoot && e.target === document.querySelector(".full-backdrop")) toggleFull(fullRoot, $('[data-act="full"]', fullRoot));
  });

  // Skript som läggs i förhandsvisningen: länkar till andra sidor stoppas, #-länkar scrollar inom förhandsvisningen.
  const PREVIEW_GUARD = "<script>document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';if(h.charAt(0)==='#'){e.preventDefault();var t=h.length>1&&document.getElementById(h.slice(1));if(t)t.scrollIntoView({behavior:'smooth'});else window.scrollTo({top:0,behavior:'smooth'});}else if(h){e.preventDefault();}});document.addEventListener('submit',function(e){e.preventDefault();});function kh(){try{parent.postMessage({kodskolanH:document.documentElement.scrollHeight},'*');}catch(e){}}addEventListener('load',kh);setTimeout(kh,50);<\/script>";

  // Förhandsvisningar i kursens exempel växer med innehållet, så att inget av resultatet göms.
  window.addEventListener("message", (e) => {
    if (!e.data || typeof e.data.kodskolanH !== "number") return;
    const f = $$("iframe.auto-h").find((x) => x.contentWindow === e.source);
    if (f) f.style.minHeight = Math.min(Math.max(e.data.kodskolanH + 4, 200), 640) + "px";
  });

  // Bygger förhandsvisningen av HTML + CSS. Ett helt dokument (med <!DOCTYPE>) används som det är,
  // och CSS:en kopplas in där <link rel="stylesheet" href="css/…"> står – precis som på riktigt.
  // Grundstil som läggs osynligt i kursens exempel, så att CSS-fliken bara visar det exemplet handlar om.
  const BASE_CSS = "body{margin:0;padding:16px;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.5;color:#1c1c1a}img{max-width:100%}";
  function buildDoc(html, css, opts) {
    opts = opts || {};
    const hidden = opts.base ? `<style>${BASE_CSS}${opts.frame || ""}</style>` : "";
    const style = `<style>${css}</style>`;
    const localSheet = /<link\b[^>]*rel=["']?stylesheet["']?[^>]*>/gi;
    const isLocal = (tag) => !/href=["']?(https?:)?\/\//i.test(tag);
    if (/<!DOCTYPE/i.test(html) && /<\/head>/i.test(html)) {
      let doc = html.replace(localSheet, (tag) => (isLocal(tag) ? style : tag));
      if (hidden) doc = doc.replace(/<head[^>]*>/i, (m) => m + hidden);
      return /<\/body>/i.test(doc) ? doc.replace(/<\/body>/i, `${PREVIEW_GUARD}</body>`) : doc + PREVIEW_GUARD;
    }
    return `<!DOCTYPE html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${hidden}${style}</head><body>${html}${PREVIEW_GUARD}</body></html>`;
  }

  function wirePlayground({ id, b }) {
    const root = document.getElementById(id);
    if (!root) return;
    const htmlEd = $('textarea[data-lang="html"]', root);
    const cssEd = $('textarea[data-lang="css"]', root);
    const frame = $("iframe", root);
    let timer;

    const typing = isTypeAlong(b);
    const lang = mainLang(b);
    const typeEd = lang === "css" ? cssEd : htmlEd;
    const start = typing ? Object.assign({}, b, { [lang]: "" }) : b;
    const set = (src) => { htmlEd.value = src.html || ""; cssEd.value = src.css || ""; update(); };

    if (typing) {
      const status = $(`#${id}-status`, root);
      const step1 = $('.pg-step[data-step="1"]', root);
      let passed = false;
      const say = (html, cls) => { status.innerHTML = html; status.className = "pg-step-status " + (cls || ""); };
      const check = (manual) => {
        if (passed) return;
        const res = compareCode(typeEd.value, b[lang], b.keepComments);
        if (res.ok) {
          passed = true;
          step1.classList.add("is-done");
          root.classList.add("step1-done");
          say(b.task ? "✓ Rätt! Gå vidare till steg 2." : "✓ Rätt skrivet!", "ok");
        } else if (manual) {
          if (!typeEd.value.trim()) say("Fliken är tom än – börja skriva.", "info");
          else if (res.missing) say(`Det du har skrivit stämmer – ${res.line - 1} av ${res.total} rader klara. Fortsätt!`, "info");
          else if (res.extra) say(`Allt stämmer, men det finns mer än de ${res.total} raderna.`, "warn");
          else say(`Rad ${res.line} av ${res.total} skiljer sig. Kolla stavning och tecken som &lt; &gt; { } : ;`, "warn");
        } else if (status.classList.contains("warn") || status.classList.contains("info")) {
          say("");
        }
      };
      typeEd.addEventListener("input", () => check(false));
      ["paste", "drop"].forEach((ev) => typeEd.addEventListener(ev, (e) => {
        const data = ev === "paste" ? e.clipboardData : e.dataTransfer;
        const txt = data ? data.getData("text/plain") : "";
        if (isOwnText(txt)) return;                         // egen kod – tillåtet
        e.preventDefault();
        say("Det här är inte din egen kod – skriv av exemplet själv.", "info");
      }));
      root.addEventListener("click", (e) => {
        if (e.target.closest('[data-act="check"]')) check(true);
        if (e.target.closest('[data-act="reset"]')) {
          passed = false; step1.classList.remove("is-done"); root.classList.remove("step1-done"); say("");
        }
      });
    }
    function update() {
      frame.srcdoc = buildDoc(htmlEd.value, cssEd.value, { base: true, frame: b.frame });
    }
    const queue = () => { clearTimeout(timer); timer = setTimeout(update, 250); };

    [htmlEd, cssEd].forEach((ed) => {
      ed.addEventListener("input", queue);
      ed.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && !e.shiftKey) {             // Tab ger indrag istället för att lämna fältet
          e.preventDefault();
          const s = ed.selectionStart, en = ed.selectionEnd;
          ed.value = ed.value.slice(0, s) + "  " + ed.value.slice(en);
          ed.selectionStart = ed.selectionEnd = s + 2;
          queue();
        } else if (e.key === "Escape") {
          ed.blur();                                        // Esc = lämna redigeraren med tangentbord
        }
      });
    });

    // Flikar: HTML / CSS
    const tabs = $$(".pg-tab", root);
    function selectTab(tab, focus) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      htmlEd.hidden = tab.dataset.tab !== "html";
      cssEd.hidden = tab.dataset.tab !== "css";
      if (focus) tab.focus();
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selectTab(tab));
      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); selectTab(tabs[(i + 1) % tabs.length], true); }
      });
    });

    root.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]");
      if (!act) return;
      if (act.dataset.act === "reset") set(start);
      if (act.dataset.act === "solution") set(b.solution);
      if (act.dataset.act === "full") { toggleFull(root, act); return; }
    });

    set(start);
  }

  /* ---------------- Sidor ---------------- */
  const main = $("#innehall");

  function renderHome() {
    const lastCh = state.last && chapterById(state.last);
    let n = 0;
    main.innerHTML = `
      <div class="hero">
        <span class="eyebrow">HTML &amp; CSS för UX-designers</span>
        <h1>Praktiska övningar</h1>
        <p class="lead"> I varje exempel skriver du först av koden och ändrar den sedan. Du kan inte förstöra något.</p>
        <div class="pg-actions">
          ${lastCh
            ? `<a class="btn primary" href="#/${lastCh.id}">Fortsätt: ${esc(lastCh.title)} →</a>`
            : `<a class="btn primary" href="#/${chapters[0].id}">Börja →</a>`}
          <a class="btn" href="#/bibliotek">Öppna biblioteket</a>
        </div>
      </div>
      ${parts.filter((p) => p.id !== "ref" && chapters.some((c) => c.part === p.id)).map((p) => `
        <h2>${esc(p.title)}</h2>
        <div class="card-grid">
          ${chapters.filter((c) => c.part === p.id).map((c) => {
            n++;
            return `<a class="card" href="#/${c.id}">
              <span class="card-num">${String(n).padStart(2, "0")}</span>
              <h3>${esc(c.title)}</h3>${c.summary ? `<p>${esc(c.summary)}</p>` : ""}</a>`;
          }).join("")}
        </div>`).join("")}
    `;
    document.title = "UX-CodeCamp – Praktiska övningar";
  }

  function renderChapter(id, keepScroll) {
    const ch = chapterById(id);
    if (!ch) { renderHome(); return; }
    const idx = chapters.indexOf(ch);
    const prev = chapters[idx - 1], next = chapters[idx + 1];
    const part = parts.find((p) => p.id === ch.part);
    playgrounds.length = 0;

    main.innerHTML = `
      <article>
        <span class="eyebrow">${esc(part ? part.title : "")}</span>
        <h1>${esc(ch.title)}</h1>
        ${ch.summary ? `<p class="lead">${esc(ch.summary)}</p>` : ""}
        ${ch.blocks.map(renderBlock).join("")}
        <footer class="chapter-footer">
          <nav class="pager" aria-label="Föregående och nästa kapitel">
            ${prev ? `<a href="#/${prev.id}"><small>← Föregående</small>${esc(prev.title)}</a>` : "<span></span>"}
            ${next ? `<a class="next" href="#/${next.id}"><small>Nästa →</small>${esc(next.title)}</a>`
                   : `<a class="next" href="#/bibliotek"><small>Klart! →</small>Till biblioteket</a>`}
          </nav>
        </footer>
      </article>`;

    playgrounds.forEach(wirePlayground);
    state.last = ch.id; save();
    document.title = `${ch.title} – UX-CodeCamp – Praktiska övningar`;
    if (!keepScroll) window.scrollTo(0, 0);
  }

  const FIGMA_MAP = [
    ["Frame", "<code>&lt;div&gt;</code> eller semantiskt element", "semantik"],
    ["Auto layout (horisontell)", "<code>display: flex;</code>", "flexbox"],
    ["Auto layout (vertikal)", "<code>display: flex; flex-direction: column;</code>", "flexbox"],
    ["Spacing between items", "<code>gap</code>", "flexbox"],
    ["Padding", "<code>padding</code>", "boxmodellen"],
    ["Fill container", "<code>flex: 1;</code>", "flexbox"],
    ["Hug contents", "standardbeteendet i flexbox", "flexbox"],
    ["Layout grid", "<code>display: grid; grid-template-columns: …</code>", "grid"],
    ["Fill", "<code>background</code>", "farg-typografi"],
    ["Stroke", "<code>border</code>", "boxmodellen"],
    ["Corner radius", "<code>border-radius</code>", "boxmodellen"],
    ["Text style", "en klass med <code>font-*</code> och <code>line-height</code>", "farg-typografi"],
    ["Color style / Variable", "<code>--variabel</code> + <code>var()</code>", "variabler"],
    ["Variable mode (Light/Dark)", "en klass som ger variablerna nya värden", "variabler"],
    ["Component", "en klass, t.ex. <code>.knapp</code>", "selektorer"],
    ["Variant", "en extra klass, t.ex. <code>class=\"knapp primar\"</code>", "selektorer"],
    ["Interactive state (hover)", "<code>:hover</code>, <code>:focus-visible</code>", "selektorer"]
  ];

  function renderLibrary() {
    main.innerHTML = `
      <span class="eyebrow">Bibliotek</span>
      <h1>Snabbreferens</h1>
      <p class="lead">Alla element och egenskaper från kursen på ett ställe. Filtrera, kopiera exemplet eller hoppa till kapitlets kodrutor.</p>

      <h2 id="figma">Figma → CSS</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>I Figma</th><th>I kod</th><th></th></tr></thead>
        <tbody>${FIGMA_MAP.map(([f, c, ch]) => `<tr><td><strong>${f}</strong></td><td>${c}</td><td><a href="#/${ch}">Kapitel →</a></td></tr>`).join("")}</tbody>
      </table></div>

      <h2 id="lista">HTML-element och CSS-egenskaper</h2>
      <div class="lib-filter">
        <input type="search" id="libSearch" placeholder="Filtrera… t.ex. border, form, flex" aria-label="Filtrera biblioteket">
        <button class="btn" type="button" data-kind="" aria-pressed="true">Alla</button>
        <button class="btn" type="button" data-kind="HTML" aria-pressed="false">HTML</button>
        <button class="btn" type="button" data-kind="CSS" aria-pressed="false">CSS</button>
      </div>
      <div class="table-wrap"><table class="lib-table">
        <thead><tr><th>Namn</th><th>Vad den gör</th><th>Exempel</th><th></th></tr></thead>
        <tbody id="libBody"></tbody>
      </table></div>
      <p class="q-explain" id="libCount"></p>`;

    let kind = "";
    const input = $("#libSearch");
    function draw() {
      const q = input.value.trim().toLowerCase();
      const rows = library.filter((r) => (!kind || r.kind === kind) &&
        (!q || (r.name + " " + r.desc + " " + r.ex).toLowerCase().includes(q)));
      $("#libBody").innerHTML = rows.map((r) => {
        const ch = chapterById(r.ch);
        return `<tr><td><code>${esc(r.name)}</code></td><td>${esc(r.desc)}</td>
          <td><code>${highlight(r.ex, r.kind === "HTML" ? "html" : "css")}</code></td>
          <td>${ch ? `<a href="#/${ch.id}">${esc(ch.title)}</a>` : ""}</td></tr>`;
      }).join("") || `<tr><td colspan="4">Inget matchade "${esc(q)}".</td></tr>`;
      $("#libCount").textContent = `Visar ${rows.length} av ${library.length}`;
    }
    input.addEventListener("input", draw);
    $$(".lib-filter .btn").forEach((b) => b.addEventListener("click", () => {
      kind = b.dataset.kind;
      $$(".lib-filter .btn").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      draw();
    }));
    draw();
    document.title = "Bibliotek – UX-CodeCamp – Praktiska övningar";
    window.scrollTo(0, 0);
  }

  /* ---------------- Router ---------------- */
  function route() {
    const hash = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const [id, anchor] = hash.split("#");
    setMenu(false);
    fullRoot = null; document.body.classList.remove("has-full");
    if (!id) { renderHome(); renderToc(null); window.scrollTo(0, 0); }
    else if (id === "bibliotek") { renderLibrary(); renderToc("bibliotek"); }
    else { renderChapter(id); renderToc(id); }
    $$(".topnav a").forEach((a) => {
      const target = a.getAttribute("href").replace("#/", "");
      const on = target === "" ? id !== "bibliotek" : target === id;
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) { const d = el.closest("details"); if (d) d.open = true; el.scrollIntoView(); }
    }
    main.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);

  /* ---------------- Kopiera-knappar ---------------- */
  main.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;
    const text = btn.parentElement.querySelector("pre").innerText;
    const done = () => { btn.textContent = "Kopierat!"; setTimeout(() => (btn.textContent = "Kopiera"), 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
  });

  /* ---------------- Sök ---------------- */
  const index = [];
  chapters.forEach((c) => {
    index.push({ title: c.title, sub: c.summary, href: `#/${c.id}`, text: `${c.title} ${c.summary}`, weight: 3 });
    let section = null;
    allBlocks(c.blocks).forEach((b) => {
      if (b.t === "more") return;
      if (b.t === "h") { section = b; index.push({ title: b.text, sub: c.title, href: `#/${c.id}#${slug(b.text)}`, text: b.text, weight: 2 }); return; }
      const raw = [b.html, b.title, b.code, b.task, (b.items || []).join(" "), (b.rows || []).flat().join(" ")].filter(Boolean).join(" ");
      if (!raw) return;
      index.push({ title: section ? section.text : c.title, sub: c.title, href: section ? `#/${c.id}#${slug(section.text)}` : `#/${c.id}`, text: strip(raw), weight: 1 });
    });
  });
  library.forEach((r) => index.push({ title: r.name, sub: `Bibliotek · ${r.kind} – ${r.desc}`, href: `#/${r.ch}`, text: `${r.name} ${r.desc} ${r.ex}`, weight: 2 }));

  const sInput = $("#searchInput"), sBox = $("#searchResults");
  let active = -1;

  function snippet(text, q) {
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return "";
    const start = Math.max(0, i - 40);
    const s = (start > 0 ? "…" : "") + text.slice(start, i + q.length + 70) + "…";
    return esc(s).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "ig"), (m) => `<mark>${m}</mark>`);
  }

  function search() {
    const q = sInput.value.trim().toLowerCase();
    active = -1;
    if (q.length < 2) { sBox.hidden = true; return; }
    const seen = new Set();
    const hits = index
      .filter((e) => e.text.toLowerCase().includes(q) || e.title.toLowerCase().includes(q))
      .map((e) => ({ e, score: e.weight + (e.title.toLowerCase().includes(q) ? 5 : 0) + (e.title.toLowerCase().startsWith(q) ? 3 : 0) }))
      .sort((a, b) => b.score - a.score)
      .filter(({ e }) => { const k = e.href + e.title; if (seen.has(k)) return false; seen.add(k); return true; })
      .slice(0, 10);
    sBox.innerHTML = hits.length
      ? hits.map(({ e }, i) => `<a class="search-result" role="option" href="${e.href}" data-i="${i}">
          <strong>${esc(e.title)}</strong><span>${snippet(e.text, q) || esc(e.sub)}</span></a>`).join("")
      : `<div class="search-empty">Inga träffar på "${esc(q)}". Prova ett annat ord.</div>`;
    sBox.hidden = false;
  }
  sInput.addEventListener("input", search);
  sInput.addEventListener("focus", search);
  sInput.addEventListener("keydown", (e) => {
    const items = $$(".search-result", sBox);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      active = (active + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle("active", i === active));
      items[active].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      const target = items[active >= 0 ? active : 0];
      if (target) { location.hash = target.getAttribute("href"); closeSearch(); }
    } else if (e.key === "Escape") { closeSearch(); sInput.blur(); }
  });
  sBox.addEventListener("click", (e) => { if (e.target.closest(".search-result")) closeSearch(); });
  function closeSearch() { sBox.hidden = true; sInput.value = ""; }
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) sBox.hidden = true; });
  document.addEventListener("keydown", (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    if (e.key === "/" && !/INPUT|TEXTAREA/.test(tag)) { e.preventDefault(); sInput.focus(); }
  });

  /* ---------------- Start ---------------- */
  route();
})();
