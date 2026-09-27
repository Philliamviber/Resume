/* =============================================================
   motion.js — code-driven motion graphics (no video files).
     1. Hero network canvas: drifting nodes, links, packets, scan rings
     2. Boot log: status lines with OK / RUN markers
     3. Status ticker: seamless marquee
     4. Decrypt effects: hero role cycling + section headings
     5. Reveal-on-scroll for anything with .reveal

   Everything honours prefers-reduced-motion, and the canvas pauses
   when it is off-screen or the tab is hidden. No libraries.
   ============================================================= */

(function () {
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!REDUCE) document.documentElement.classList.add("motion-ok");
  window.MOTION = { reduce: REDUCE };

  /* Fire cb once when el scrolls into view (immediately under reduced motion). */
  function onView(el, cb, threshold = 0.3) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { cb(el); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } });
    }, { threshold });
    io.observe(el);
  }
  window.MOTION.onView = onView;

  /* ---------------------------------------------------------------
     1. HERO NETWORK
     --------------------------------------------------------------- */
  function heroNet() {
    const canvas = document.getElementById("hero-net");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const COLORS = ["0,229,255", "0,229,255", "0,229,255", "57,255,20", "189,0,255"];
    let w = 0, h = 0, dpr = 1, nodes = [], packets = [], rings = [];
    let running = false, visible = true, raf = 0, last = 0, spawnT = 0, ringT = 0;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 132;

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(90, Math.round((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: 1.2 + Math.random() * 1.8, c: COLORS[(Math.random() * COLORS.length) | 0],
        hub: Math.random() < 0.08,
      }));
      packets = []; rings = [];
      if (!running) draw(0);
    }

    function neighbours(i) {
      const a = nodes[i], out = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y;
        if (dx * dx + dy * dy < LINK * LINK) out.push(j);
      }
      return out;
    }

    function step(dt) {
      for (const n of nodes) {
        n.x += n.vx * dt; n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }
      spawnT += dt; ringT += dt;
      if (spawnT > 22 && packets.length < 14) {           // ~every 370ms
        spawnT = 0;
        const i = (Math.random() * nodes.length) | 0, nb = neighbours(i);
        if (nb.length) packets.push({ a: i, b: nb[(Math.random() * nb.length) | 0], t: 0, s: 0.012 + Math.random() * 0.012 });
      }
      if (ringT > 150) {                                   // a scan ring every ~2.5s
        ringT = 0;
        const hubs = nodes.filter((n) => n.hub);
        const n = hubs.length ? hubs[(Math.random() * hubs.length) | 0] : nodes[0];
        rings.push({ x: n.x, y: n.y, r: 4, a: 0.55 });
      }
      packets = packets.filter((p) => (p.t += p.s * dt) < 1);
      rings = rings.filter((r) => { r.r += 1.1 * dt; r.a -= 0.006 * dt; return r.a > 0; });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const mx = (a.x + b.x) / 2 - mouse.x, my = (a.y + b.y) / 2 - mouse.y;
          const near = mx * mx + my * my < 150 * 150;
          const alpha = (1 - Math.sqrt(d2) / LINK) * (near ? 0.55 : 0.2);
          ctx.strokeStyle = `rgba(0,229,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = near ? 1.1 : 0.7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      // scan rings
      for (const r of rings) {
        ctx.strokeStyle = `rgba(57,255,20,${r.a.toFixed(3)})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke();
      }
      // packets
      for (const p of packets) {
        const a = nodes[p.a], b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(57,255,20,0.95)";
        ctx.shadowColor = "rgba(57,255,20,0.9)"; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(x, y, 1.9, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.c},${n.hub ? 0.95 : 0.6})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.hub ? n.r + 1.4 : n.r, 0, Math.PI * 2); ctx.fill();
        if (n.hub) {
          ctx.strokeStyle = `rgba(${n.c},0.35)`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2); ctx.stroke();
        }
      }
    }

    function loop(now) {
      const dt = Math.min(3, (now - (last || now)) / 16.67);
      last = now;
      step(dt); draw();
      raf = requestAnimationFrame(loop);
    }
    function start() { if (running || REDUCE || !visible || document.hidden) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    let rt = 0;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    const hero = canvas.parentElement;
    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(canvas);
    }
    start();
  }

  /* ---------------------------------------------------------------
     4. DECRYPT / SCRAMBLE TEXT
     --------------------------------------------------------------- */
  const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEF";
  function scrambleTo(el, finalText, duration = 700) {
    return new Promise((resolve) => {
      if (REDUCE) { el.textContent = finalText; resolve(); return; }
      const from = el.textContent || "";
      const len = Math.max(from.length, finalText.length);
      const queue = Array.from({ length: len }, (_, i) => ({
        from: from[i] || "", to: finalText[i] || "",
        start: Math.random() * duration * 0.4, end: duration * 0.4 + Math.random() * duration * 0.6,
      }));
      const t0 = performance.now();
      function frame(now) {
        const t = now - t0; let out = "", done = 0;
        for (const q of queue) {
          if (t >= q.end) { out += q.to; done++; }
          else if (t >= q.start) out += q.to === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          else out += q.from;
        }
        el.textContent = out;
        if (done === queue.length) resolve(); else requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }
  window.MOTION.scrambleTo = scrambleTo;

  function scrambleHeadings() {
    document.querySelectorAll("[data-scramble]").forEach((h) => {
      const final = h.textContent.trim();
      onView(h, () => {
        if (REDUCE) return;
        // Screen readers get the real heading throughout; sighted users see it decrypt.
        h.innerHTML = `<span class="sr-only">${final.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span><span aria-hidden="true"></span>`;
        const vis = h.lastElementChild;
        vis.textContent = final.replace(/\S/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
        scrambleTo(vis, final, 650).then(() => { h.textContent = final; });
      }, 0.6);
    });
  }

  function cycleRoles(roles) {
    const el = document.getElementById("hero-role");
    if (!el || !roles || roles.length < 2 || REDUCE) return;
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % roles.length;
      scrambleTo(el, roles[i], 800);
    }, 3800);
  }

  /* ---------------------------------------------------------------
     2. BOOT LOG
     --------------------------------------------------------------- */
  function bootLog(lines) {
    const host = document.getElementById("boot-log");
    if (!host || !lines) return;
    host.innerHTML = lines.map((l, i) => {
      const run = l.status === "run";
      return `<li style="--i:${i}">
        <span class="b-tag ${run ? "run" : "ok"}">[${run ? '<span class="spin">·</span>RUN' : " OK "}]</span>
        <span class="b-key">${l.key}</span><span class="b-dots" aria-hidden="true"></span>
        <span class="b-val">${l.val}</span>
      </li>`;
    }).join("");
    requestAnimationFrame(() => host.classList.add("play"));
    if (REDUCE) return;
    const spinners = host.querySelectorAll(".spin");
    const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let f = 0;
    if (spinners.length) setInterval(() => { f = (f + 1) % FRAMES.length; spinners.forEach((s) => (s.textContent = FRAMES[f])); }, 110);
  }

  /* ---------------------------------------------------------------
     3. STATUS TICKER
     --------------------------------------------------------------- */
  function ticker(items) {
    const track = document.getElementById("ticker-track");
    if (!track || !items) return;
    const li = (t, hidden) => `<li${hidden ? ' aria-hidden="true"' : ""}>
        <span class="tk-s ${t.s === "run" ? "run" : "ok"}">${t.s === "run" ? "RUN" : "OK"}</span>
        <span class="tk-k">${t.k}</span><span>${t.v}</span></li>`;
    // Two copies make the -50% translate loop seamless; the copy is hidden from AT.
    track.innerHTML = items.map((t) => li(t, false)).join("") + items.map((t) => li(t, true)).join("");
  }

  /* ---------------------------------------------------------------
     5. REVEAL ON SCROLL
     --------------------------------------------------------------- */
  function reveals() {
    document.querySelectorAll(".reveal").forEach((el) => onView(el, () => el.classList.add("is-in"), 0.15));
  }
  window.MOTION.reveals = reveals;

  heroNet();
  document.addEventListener("resume:ready", (ev) => {
    const p = ev.detail.profile || {};
    bootLog(p.bootLog);
    ticker(p.ticker);
    cycleRoles(p.roles);
    scrambleHeadings();
    // Sections render synchronously on the same event; reveal after they exist.
    setTimeout(reveals, 0);
  });
})();
