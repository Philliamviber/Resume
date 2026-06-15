/* =============================================================
   wordcloud.js — tech "arsenal" word cloud via wordcloud2.js.
   Reads data.wordCloud ([term, weight] pairs) from resume-data.json.
   ============================================================= */

(function () {
  const PALETTE = ["#39ff14", "#00e5ff", "#ffb000", "#ff2e63", "#bd00ff", "#00ff9d"];

  function sizeCanvas(canvas) {
    // Match the canvas backing store to its displayed size for crisp text.
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(280, Math.floor(rect.width));
    const h = Math.max(280, Math.floor(rect.height || 360));
    canvas.width = w;
    canvas.height = h;
    return { w, h };
  }

  function draw(data) {
    const canvas = document.getElementById("wordcloud");
    if (!canvas || typeof WordCloud === "undefined") {
      console.warn("wordcloud2.js not available or #wordcloud missing.");
      return;
    }
    const { w } = sizeCanvas(canvas);
    const scale = w / 520;                        // scale weights to canvas width

    WordCloud(canvas, {
      list: data.wordCloud,
      gridSize: Math.round(8 * scale),
      weightFactor: (n) => Math.pow(n, 1.05) * 2.4 * scale,
      fontFamily: "JetBrains Mono, monospace",
      color: (word, weight) => PALETTE[Math.floor(weight) % PALETTE.length],
      backgroundColor: "transparent",
      rotateRatio: 0.32,
      rotationSteps: 2,
      shuffle: false,
      drawOutOfBound: false,
    });
  }

  document.addEventListener("resume:ready", (ev) => {
    const data = ev.detail;
    draw(data);

    // Redraw on resize (debounced) so it stays sharp/responsive.
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => draw(data), 250);
    });
  });
})();
