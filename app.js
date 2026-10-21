(function () {
  "use strict";

  // State
  let questionsData = [];
  let activeTimers = {};

  // ==========================================================================
  // 1. TOKENIZING SYNTAX HIGHLIGHTER (C++ / JAVA / PYTHON)
  // ==========================================================================
  const KW_SET = new Set([
    "if","else","for","while","do","switch","case","break","continue","return",
    "struct","class","public","private","protected","static","final","void",
    "const","constexpr","auto","template","typename","using","namespace","new",
    "delete","try","catch","throw","import","from","def","elif","in","not",
    "and","or","True","False","None","lambda","pass","yield"," inline","operator",
    "true","false","nullptr","NULL","sizeof","typedef"
  ]);
  const TYPE_SET = new Set([
    "int","long","short","char","bool","boolean","float","double","unsigned",
    "signed","size_t","ll","string","vector","queue","stack","pair","map",
    " unordered_map","set","array","bitset","DataInputStream","StringBuilder",
    "BufferedInputStream","Random","IOException","System","Math","Arrays","Integer"
  ]);

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlightLine(rawLine) {
    // Full-line preprocessor directive
    const trimmed = rawLine.trimStart();
    if (trimmed.startsWith("#include") || trimmed.startsWith("#define") || trimmed.startsWith("#pragma")) {
      return `<span class="tok-pre">${escapeHtml(rawLine)}</span>`;
    }

    let out = "";
    let i = 0, n = rawLine.length;

    while (i < n) {
      const ch = rawLine[i];

      // C++/Java // comment or Python # comment
      if ((ch === "/" && rawLine[i + 1] === "/") || (ch === "#" && !trimmed.startsWith("#include"))) {
        out += `<span class="tok-com">${escapeHtml(rawLine.slice(i))}</span>`;
        break;
      }
      // Block comment fragment on line
      if (ch === "/" && rawLine[i + 1] === "*") {
        const end = rawLine.indexOf("*/", i + 2);
        if (end === -1) {
          out += `<span class="tok-com">${escapeHtml(rawLine.slice(i))}</span>`;
          break;
        } else {
          out += `<span class="tok-com">${escapeHtml(rawLine.slice(i, end + 2))}</span>`;
          i = end + 2;
          continue;
        }
      }
      // Strings or chars
      if (ch === '"' || ch === "'") {
        let j = i + 1;
        while (j < n && rawLine[j] !== ch) {
          if (rawLine[j] === "\\") j++;
          j++;
        }
        out += `<span class="tok-str">${escapeHtml(rawLine.slice(i, j + 1))}</span>`;
        i = j + 1;
        continue;
      }
      // Numbers
      if (/[0-9]/.test(ch) && (i === 0 || !/[A-Za-z_]/.test(rawLine[i - 1]))) {
        let j = i;
        while (j < n && /[0-9a-fA-FxX.LLUull]/.test(rawLine[j])) j++;
        out += `<span class="tok-num">${escapeHtml(rawLine.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      // Identifiers / Keywords / Types / Functions
      if (/[A-Za-z_]/.test(ch)) {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9_]/.test(rawLine[j])) j++;
        const word = rawLine.slice(i, j);
        if (KW_SET.has(word)) {
          out += `<span class="tok-kw">${word}</span>`;
        } else if (TYPE_SET.has(word)) {
          out += `<span class="tok-type">${word}</span>`;
        } else if (rawLine[j] === "(") {
          out += `<span class="tok-fn">${word}</span>`;
        } else {
          out += word;
        }
        i = j;
        continue;
      }

      out += escapeHtml(ch);
      i++;
    }
    return out;
  }

  function renderHighlightedCode(rawCode, qid) {
    const lines = rawCode.replace(/\r\n/g, "\n").split("\n");
    let inBlockComment = false;

    return lines.map((lineText, idx) => {
      const ln = idx + 1;
      let html;
      const t = lineText.trim();
      if (inBlockComment) {
        html = `<span class="tok-com">${escapeHtml(lineText)}</span>`;
        if (t.includes("*/")) inBlockComment = false;
      } else if (t.startsWith("/*") && !t.includes("*/")) {
        inBlockComment = true;
        html = `<span class="tok-com">${escapeHtml(lineText)}</span>`;
      } else {
        html = highlightLine(lineText);
      }
      return `<div class="code-line" id="${qid}-L${ln}" data-line="${ln}"><span class="ln">${ln}</span><span class="lc">${html}</span></div>`;
    }).join("");
  }

  // ==========================================================================
  // 2. INLINE GLOSSARY TERM DECORATOR
  // ==========================================================================
  const TERM_PATTERNS = [
    { rx: /\b(monotonic stack)\b/gi, key: "Monotonic Stack" },
    { rx: /\b(CDQ)\b/g, key: "CDQ" },
    { rx: /\b(Fenwick tree|BIT)\b/gi, key: "BIT" },
    { rx: /\b(LCA|lowest common ancestor)\b/gi, key: "LCA" },
    { rx: /\b(Suffix Automaton|SAM)\b/gi, key: "SAM" },
    { rx: /\b(Grundy|mex)\b/gi, key: "MEX / Grundy" },
    { rx: /\b(Voronoi|Delaunay)\b/gi, key: "Voronoi & Delaunay" },
    { rx: /\b(2-SAT|SCC|Kosaraju)\b/gi, key: "2-SAT & SCC" },
    { rx: /\b(Li Chao tree)\b/gi, key: "Li Chao Tree" },
    { rx: /\b(DSU)\b/g, key: "DSU with Rollback" },
    { rx: /\b(implicit treap|treap)\b/gi, key: "Implicit Treap" },
    { rx: /\b(NTT|Legendre symbol)\b/gi, key: "NTT & Legendre Symbol" },
    { rx: /\b(FWHT|Walsh-Hadamard)\b/gi, key: "FWHT" }
  ];

  function decorateGlossaryTerms(html) {
    // Avoid replacing inside HTML tags
    return html.replace(/(>[^<]+<)/g, (segment) => {
      let s = segment;
      TERM_PATTERNS.forEach(({ rx, key }) => {
        s = s.replace(rx, `<span class="glossary-term" data-term="${key}">$1</span>`);
      });
      return s;
    });
  }

  // ==========================================================================
  // 3. PARSE LEGACY HaXtreme_Defense_Guide.html DOM INTO STRUCTURED CARDS
  // ==========================================================================
  function parseLegacyDocument(doc) {
    const sections = doc.querySelectorAll("section.card");
    const parsed = [];

    sections.forEach((sec) => {
      const qid = sec.id; // e.g. "q1"
      const num = sec.querySelector(".num")?.textContent.trim() || qid.replace("q", "");
      const title = sec.querySelector(".card-head h2")?.textContent.trim() || qid;
      const metaHtml = sec.querySelector(".meta")?.innerHTML || "";
      const hasCode = !!sec.querySelector("details.code pre");

      // Extract clean raw code without <span class="ln">
      let rawCode = "";
      let codeFile = "";
      const codeDetails = sec.querySelector("details.code");
      if (codeDetails) {
        codeFile = codeDetails.querySelector("summary code")?.textContent.trim() || "solution.cpp";
        const preClone = codeDetails.querySelector("pre").cloneNode(true);
        preClone.querySelectorAll(".ln").forEach((el) => el.remove());
        rawCode = preClone.textContent;
      }

      // Remove header, meta, and code details from clone to keep explanation body
      const bodyClone = sec.cloneNode(true);
      bodyClone.querySelector(".card-head")?.remove();
      bodyClone.querySelector(".meta")?.remove();
      bodyClone.querySelector("details.code")?.remove();

      parsed.push({
        qid,
        num,
        title,
        metaHtml,
        hasCode,
        codeFile,
        rawCode,
        explainHtml: bodyClone.innerHTML
      });
    });

    return parsed;
  }

  // ==========================================================================
  // 4. RENDER WORKSPACE (TOC + SIDE-BY-SIDE CARDS + ANIMATIONS + LINE LINKS)
  // ==========================================================================
  // For questions without manual stepLines: find, for each English step, the first code line
  // (after the header comment) that mentions an identifier from the step's <code> snippets.
  function guessStepRanges(ol, codeLines) {
    if (!ol) return null;
    const lis = [...ol.querySelectorAll("li")];
    const bodyStart = 0;
    // mark lines inside /* ... */ blocks and Python docstrings as comments
    const inBlock = [];
    let open = false;
    codeLines.forEach((l, i) => {
      const t = l.trim();
      const startsBlock = t.startsWith("/*") || t.startsWith('"""');
      inBlock[i] = open || startsBlock;
      if (!open && startsBlock && !(t.length > 3 && (t.endsWith("*/") || t.slice(3).includes('"""')))) open = true;
      else if (open && (t.includes("*/") || t.includes('"""'))) open = false;
    });
    const isCommentAt = (i) => inBlock[i] || /^\s*(\/\/|#|\*)/.test(codeLines[i]);
    const starts = lis.map((li) => {
      const ids = [];
      li.querySelectorAll("code").forEach((c) => {
        (c.textContent.match(/[A-Za-z_][A-Za-z0-9_]{2,}/g) || []).forEach((w) => ids.push(w));
      });
      for (const id of ids) {
        const re = new RegExp("\\b" + id + "\\b");
        for (let i = bodyStart; i < codeLines.length; i++) {
          if (!isCommentAt(i) && re.test(codeLines[i])) return i + 1;
        }
      }
      return null;
    });
    if (starts.filter(Boolean).length < Math.ceil(lis.length / 2)) return null;
    // a step with no match sits between its neighbours: start right after the previous match
    for (let i = 0; i < starts.length; i++) {
      if (starts[i]) continue;
      let prev = null;
      for (let j = i - 1; j >= 0 && !prev; j--) prev = starts[j];
      starts[i] = prev ? Math.min(prev + 1, codeLines.length) : bodyStart + 1;
    }
    return starts.map((s) => {
      if (!s) return null;
      const later = starts.filter((t) => t && t > s);
      const next = later.length ? Math.min(...later) - 1 : codeLines.length;
      return [s, Math.min(next, s + 24)];
    });
  }

  function renderWorkspace(items) {
    questionsData = items;
    const tocList = document.getElementById("tocList");
    const container = document.getElementById("questionsContainer");
    const statsBar = document.getElementById("statsBar");

    let codeCount = 0, animCount = 0;
    tocList.innerHTML = "";
    container.innerHTML = "";

    items.forEach((item) => {
      const enh = window.QUESTION_ENHANCEMENTS[item.qid] || {};
      if (item.hasCode) codeCount++;
      if (enh.animFrames) animCount++;

      // 1. TOC Entry
      const a = document.createElement("a");
      a.href = `#${item.qid}`;
      a.className = item.hasCode ? "toc-code" : "toc-q";
      a.dataset.title = `${item.num} ${item.title}`.toLowerCase();
      a.innerHTML = `
        <span class="tn">${item.num}</span>
        <span class="tt">${item.title}</span>
        ${enh.animFrames ? '<span class="toc-anim-dot" title="Interactive Animation"></span>' : ""}
      `;
      tocList.appendChild(a);

      // 2. Build Original Question Statement Box (EN + SI) if available
      let origBoxHtml = "";
      if (enh.origEn) {
        origBoxHtml = `
          <details class="orig-box" open>
            <summary>
              <span class="en">📄 Original HackerRank Question & Sample (EN + සිංහල)</span>
              <span class="si">📄 මුල් HackerRank ප්‍රශ්නය සහ නිදසුන් (EN + සිංහල)</span>
            </summary>
            <div class="orig-content">
              <p class="en" style="white-space:pre-line">${enh.origEn}</p>
              <p class="si" style="white-space:pre-line">${enh.origSi}</p>
              <div style="font-size:13px;color:var(--muted)"><b>Constraints:</b> <code>${enh.constraints}</code></div>
              <div class="sample-grid">
                <div><b>Sample Input</b><pre>${enh.sampleIn}</pre></div>
                <div><b>Sample Output</b><pre>${enh.sampleOut}</pre></div>
              </div>
            </div>
          </details>
        `;
      }

      // 2b. Original PDF diagrams + full PDF text (originals.js, built by tools/build_originals.py)
      const orig = (window.ORIGINALS || {})[item.qid];
      if (orig) {
        const imgs = orig.images
          .map(
            (src, i) => `
            <figure class="orig-fig">
              <img src="${src}" alt="Diagram ${i + 1} from the original question" loading="lazy">
              <figcaption><span class="en">Diagram ${i + 1} from the original PDF</span><span class="si">මුල් PDF එකේ රූප සටහන ${i + 1}</span></figcaption>
            </figure>`
          )
          .join("");
        origBoxHtml += `
          <details class="orig-box" ${enh.origEn ? "" : "open"}>
            <summary>
              <span class="en">📄 Original question text${orig.images.length ? " & diagrams" : ""} (from the PDF)</span>
              <span class="si">📄 මුල් ප්‍රශ්නයේ පෙළ${orig.images.length ? " සහ රූප සටහන්" : ""} (PDF එකෙන්)</span>
            </summary>
            <div class="orig-content">
              ${imgs}
              <pre class="orig-text">${escapeHtml(orig.text)}</pre>
            </div>
          </details>
        `;
      }

      // 3. Build Interactive Animation Box if available
      let animBoxHtml = "";
      if (enh.animFrames && enh.animFrames.length > 0) {
        animBoxHtml = `
          <div class="anim-box" id="anim-${item.qid}" data-frame="0">
            <div class="anim-header">
              <strong>
                <span class="en">🎬 ${enh.animTitleEn}</span>
                <span class="si">🎬 ${enh.animTitleSi}</span>
              </strong>
              <div class="anim-controls">
                <button data-anim-act="play" data-qid="${item.qid}">▶ Play</button>
                <button data-anim-act="step" data-qid="${item.qid}">⏭ Step (1/${enh.animFrames.length})</button>
                <button data-anim-act="reset" data-qid="${item.qid}">↺ Reset</button>
              </div>
            </div>
            <div class="anim-stage" id="anim-stage-${item.qid}">
              ${enh.animFrames[0].svg}
            </div>
            <div class="anim-caption" id="anim-cap-${item.qid}">
              <div class="en">${enh.animFrames[0].en}</div>
              <div class="si">${enh.animFrames[0].si}</div>
            </div>
          </div>
        `;
      }

      // 4. Create Card Element
      const card = document.createElement("section");
      card.className = "q-card";
      card.id = item.qid;

      card.innerHTML = `
        <div class="q-card-header">
          <span class="q-num">${item.num}</span>
          <h2>${item.title}</h2>
          ${item.hasCode
            ? `<span class="badge b-code"><span class="en">Interactive Code + Line Sync</span><span class="si">Code + පේළි සබැඳිය</span></span>`
            : `<span class="badge b-q"><span class="en">Question & Guide</span><span class="si">ප්‍රශ්නය සහ විස්තරය</span></span>`}
          ${enh.animFrames ? `<span class="badge b-anim">🎬 Animated</span>` : ""}
        </div>
        <div class="meta" style="margin-bottom:12px;color:var(--muted);font-size:13.5px">${item.metaHtml}</div>

        <div class="split-workspace ${item.hasCode ? "" : "single-col"}">
          <div class="explain-pane" id="exp-${item.qid}">
            ${origBoxHtml}
            ${animBoxHtml}
            ${decorateGlossaryTerms(item.explainHtml)}
          </div>

          ${item.hasCode ? `
          <div class="code-pane" id="code-pane-${item.qid}">
            <div class="code-pane-header">
              <span>💻 <code>${item.codeFile}</code></span>
              <span class="code-jump-status" id="status-${item.qid}">
                <span class="en">Click any step on the left to jump to code lines</span>
                <span class="si">වම් පස ඕනෑම පියවරක් click කර අදාළ code පේළි බලන්න</span>
              </span>
            </div>
            <div class="code-scroll-container" id="code-scroll-${item.qid}">
              ${renderHighlightedCode(item.rawCode, item.qid)}
            </div>
          </div>` : ""}
        </div>
      `;

      container.appendChild(card);

      // 5. Wire Step-to-Code Line Ranges (both EN and SI <ol class="steps">)
      if (item.hasCode) {
        const codeLines = item.rawCode.split("\n");
        const totalLines = codeLines.length;
        const stepLists = card.querySelectorAll("ol.steps");
        const autoRanges = enh.stepLines ? null : guessStepRanges(stepLists[0], codeLines);
        stepLists.forEach((ol) => {
          const lis = ol.querySelectorAll("li");
          lis.forEach((li, idx) => {
            let range;
            if (enh.stepLines && enh.stepLines[idx]) {
              range = enh.stepLines[idx];
            } else if (autoRanges && autoRanges[idx]) {
              range = autoRanges[idx];
            } else {
              // Automatic proportional line mapping if not manually specified
              const start = Math.max(1, Math.floor((idx * totalLines) / lis.length) + 1);
              const end = Math.min(totalLines, Math.floor(((idx + 1) * totalLines) / lis.length));
              range = [start, end];
            }
            li.dataset.qid = item.qid;
            li.dataset.start = range[0];
            li.dataset.end = range[1];
            li.innerHTML += ` <span class="line-pill">↗ Lines ${range[0]}–${range[1]}</span>`;
          });
        });
      }
    });

    statsBar.innerHTML = `
      <span class="stat-pill">📚 Questions Loaded: <b>${items.length}</b></span>
      <span class="stat-pill">💻 Colorful Side-by-Side Codes: <b>${codeCount}</b></span>
      <span class="stat-pill">🎬 Interactive Visual Animations: <b>${animCount}</b></span>
      <span class="stat-pill">📖 Bilingual Glossary Terms: <b>${window.GLOSSARY_DATA.length}</b></span>
    `;
  }

  // ==========================================================================
  // 5. CLICK EXPLANATION STEP -> JUMP TO & HIGHLIGHT CODE LINES
  // ==========================================================================
  function highlightCodeRange(qid, startLine, endLine, stepEl) {
    const card = document.getElementById(qid);
    if (!card) return;

    // Highlight active step
    card.querySelectorAll("ol.steps li").forEach((el) => el.classList.remove("step-active"));
    if (stepEl) stepEl.classList.add("step-active");

    // Highlight code lines
    const scrollBox = document.getElementById(`code-scroll-${qid}`);
    if (!scrollBox) return;

    scrollBox.querySelectorAll(".code-line").forEach((lnEl) => {
      const lnum = parseInt(lnEl.dataset.line, 10);
      if (lnum >= startLine && lnum <= endLine) {
        lnEl.classList.add("active-line");
      } else {
        lnEl.classList.remove("active-line");
      }
    });

    // Scroll first highlighted line into center of code viewer
    const targetLine = document.getElementById(`${qid}-L${startLine}`);
    if (targetLine) {
      const topOffset = targetLine.offsetTop - scrollBox.offsetTop - 90;
      scrollBox.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }

    const status = document.getElementById(`status-${qid}`);
    if (status) {
      status.textContent = `Showing Lines ${startLine}–${endLine}`;
    }
  }

  // Event delegation for steps and animations
  document.addEventListener("click", (e) => {
    const stepLi = e.target.closest("ol.steps li[data-qid]");
    if (stepLi) {
      highlightCodeRange(
        stepLi.dataset.qid,
        parseInt(stepLi.dataset.start, 10),
        parseInt(stepLi.dataset.end, 10),
        stepLi
      );
      return;
    }

    const animBtn = e.target.closest("button[data-anim-act]");
    if (animBtn) {
      const qid = animBtn.dataset.qid;
      const act = animBtn.dataset.animAct;
      handleAnimAction(qid, act);
    }
  });

  // ==========================================================================
  // 6. INTERACTIVE ANIMATION CONTROLLER
  // ==========================================================================
  function setAnimFrame(qid, frameIdx) {
    const enh = window.QUESTION_ENHANCEMENTS[qid];
    if (!enh || !enh.animFrames) return;
    const frames = enh.animFrames;
    const idx = ((frameIdx % frames.length) + frames.length) % frames.length;

    const box = document.getElementById(`anim-${qid}`);
    const stage = document.getElementById(`anim-stage-${qid}`);
    const cap = document.getElementById(`anim-cap-${qid}`);
    const stepBtn = box.querySelector('button[data-anim-act="step"]');

    box.dataset.frame = idx;
    stage.innerHTML = frames[idx].svg;
    cap.innerHTML = `<div class="en">${frames[idx].en}</div><div class="si">${frames[idx].si}</div>`;
    if (stepBtn) stepBtn.textContent = `⏭ Step (${idx + 1}/${frames.length})`;
  }

  function handleAnimAction(qid, act) {
    const box = document.getElementById(`anim-${qid}`);
    if (!box) return;
    const cur = parseInt(box.dataset.frame || "0", 10);

    if (act === "step") {
      clearInterval(activeTimers[qid]);
      setAnimFrame(qid, cur + 1);
    } else if (act === "reset") {
      clearInterval(activeTimers[qid]);
      setAnimFrame(qid, 0);
    } else if (act === "play") {
      clearInterval(activeTimers[qid]);
      activeTimers[qid] = setInterval(() => {
        const now = parseInt(box.dataset.frame || "0", 10);
        setAnimFrame(qid, now + 1);
      }, 2400);
    }
  }

  // ==========================================================================
  // 7. GLOSSARY DRAWER & INLINE HOVER TOOLTIPS
  // ==========================================================================
  function renderGlossary(filter = "") {
    const list = document.getElementById("glossaryList");
    const q = filter.trim().toLowerCase();
    list.innerHTML = window.GLOSSARY_DATA
      .filter((g) => !q || g.term.toLowerCase().includes(q) || g.en.toLowerCase().includes(q) || g.si.includes(q))
      .map((g) => `
        <div class="gloss-card">
          <h4>${g.term} <span class="badge b-anim" style="font-size:11px">${g.cat}</span></h4>
          <p class="en">${g.en}</p>
          <p class="si">${g.si}</p>
          <div class="gloss-ex">
            <div class="en"><b>Example:</b> ${g.exEn}</div>
            <div class="si"><b>උදාහරණය:</b> ${g.exSi}</div>
          </div>
        </div>
      `).join("");
  }

  const tooltip = document.getElementById("termTooltip");
  document.addEventListener("mouseover", (e) => {
    const t = e.target.closest(".glossary-term");
    if (!t) {
      tooltip.hidden = true;
      return;
    }
    const entry = window.GLOSSARY_DATA.find((g) => g.term === t.dataset.term);
    if (!entry) return;
    tooltip.innerHTML = `
      <strong style="color:var(--accent)">${entry.term}</strong>
      <div class="en" style="margin-top:4px">${entry.en}</div>
      <div class="si" style="margin-top:4px">${entry.si}</div>
    `;
    tooltip.hidden = false;
    const rect = t.getBoundingClientRect();
    tooltip.style.left = `${Math.min(window.innerWidth - 390, Math.max(10, rect.left))}px`;
    tooltip.style.top = `${rect.bottom + 8}px`;
  });

  // ==========================================================================
  // 8. UI CONTROLS (LANGUAGE, THEME, SEARCH, LEGACY HTML IMPORT)
  // ==========================================================================
  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.dataset.lang = btn.dataset.setLang;
      document.querySelectorAll("[data-set-lang]").forEach((b) => b.classList.toggle("on", b === btn));
    });
  });

  document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === "light" ? "dark" : "light";
  });

  document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("tocNav").classList.toggle("open");
  });

  document.getElementById("glossaryBtn").addEventListener("click", () => {
    renderGlossary();
    document.getElementById("glossaryBackdrop").hidden = false;
  });
  document.getElementById("closeGlossaryBtn").addEventListener("click", () => {
    document.getElementById("glossaryBackdrop").hidden = true;
  });
  document.getElementById("glossarySearch").addEventListener("input", (e) => {
    renderGlossary(e.target.value);
  });

  document.getElementById("tocSearch").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll("#tocList a").forEach((a) => {
      a.style.display = a.dataset.title.includes(q) ? "" : "none";
    });
  });

  // File input fallback if user opens index.html directly via file://
  document.getElementById("htmlFileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(reader.result, "text/html");
      renderWorkspace(parseLegacyDocument(doc));
    };
    reader.readAsText(file);
  });

  // content.js (built by tools/build_content.py) embeds the guide, so this works from file:// too
  if (window.LEGACY_HTML) {
    const doc = new DOMParser().parseFromString(window.LEGACY_HTML, "text/html");
    renderWorkspace(parseLegacyDocument(doc));
  } else fetch("HaXtreme_Defense_Guide.html")
    .then((r) => {
      if (!r.ok) throw new Error("Not found via fetch");
      return r.text();
    })
    .then((htmlText) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      renderWorkspace(parseLegacyDocument(doc));
    })
    .catch(() => {
      // If opened via file:// where fetch is blocked, prompt user to click "Load Original HTML"
      document.getElementById("questionsContainer").innerHTML = `
        <div class="q-card" style="text-align:center;padding:40px">
          <h2>📂 Click "Load Original HTML" in the Top Bar (or run a local server)</h2>
          <p class="en">Your browser blocks automatic local <code>file://</code> reads. Click the <b>📂 Load Original HTML</b> button in the top bar and select your <code>HaXtreme_Defense_Guide.html</code> file to instantly load and colorize all 40 questions and 35 source codes side-by-side!</p>
          <p class="si">ඉහළ තීරුවේ ඇති <b>📂 මුල් HTML ගොනුව (Load Original HTML)</b> බොත්තම ඔබා ඔබගේ <code>HaXtreme_Defense_Guide.html</code> ගොනුව තෝරන්න. එවිට ප්‍රශ්න 40ම සහ code 35ම වර්ණවත්ව දෙපසින් (Side-by-Side) දිස්වනු ඇත!</p>
        </div>
      `;
    });
})();
