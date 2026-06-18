/* =============================================================
   graph.js — the centerpiece "attack-path" career graph.
   Built on vis-network. Nodes come straight from
   resume-data.json -> graph.{nodes,edges}. Styling mimics a
   BloodHound attack-path map: dark canvas, glowing nodes,
   type-colored edges, physics-driven layout.
   ============================================================= */

(function () {
  const TYPE_COLORS = {
    root:        "#ff2e63",
    company:     "#00e5ff",
    achievement: "#39ff14",
    skill:       "#ffb000",
    cert:        "#bd00ff",
  };

  document.addEventListener("resume:ready", (ev) => {
    const data = ev.detail;
    const host = document.getElementById("graph");
    if (!host || typeof vis === "undefined") {
      console.warn("vis-network not available or #graph missing.");
      return;
    }

    // ---- Build node + edge datasets with theme styling ----
    const nodes = new vis.DataSet(
      data.graph.nodes.map((n) => {
        const color = TYPE_COLORS[n.type] || "#8899aa";
        return {
          id: n.id,
          label: n.label,
          value: n.value || 14,
          group: n.type,
          title: n.meta || undefined,        // native tooltip
          _type: n.type,
          _meta: n.meta || "",
          shape: n.type === "root" ? "hexagon" : "dot",
          color: {
            background: color,
            border: "#ffffff22",
            highlight: { background: color, border: "#ffffff" },
            hover: { background: color, border: "#ffffff" },
          },
          font: {
            color: "#e8eef4",
            face: "JetBrains Mono, monospace",
            size: n.type === "root" ? 18 : 13,
            strokeWidth: 4,
            strokeColor: "#05080d",
          },
          shadow: { enabled: true, color: color, size: 22, x: 0, y: 0 },
        };
      })
    );

    const edges = new vis.DataSet(
      data.graph.edges.map((e, i) => ({
        id: "e" + i,
        from: e.from,
        to: e.to,
        label: e.label || undefined,
        arrows: { to: { enabled: true, scaleFactor: 0.45 } },
        color: { color: "#2a3b4d", highlight: "#39ff14", hover: "#00e5ff", opacity: 0.85 },
        width: 1.2,
        selectionWidth: 2,
        smooth: { type: "continuous", roundness: 0.4 },
        font: { color: "#8c98a4", size: 9, face: "JetBrains Mono, monospace", strokeWidth: 0, align: "middle" },
      }))
    );

    const options = {
      autoResize: true,
      nodes: { scaling: { min: 10, max: 46 }, borderWidth: 1.5 },
      edges: { hoverWidth: 1.5 },
      interaction: { hover: true, tooltipDelay: 120, navigationButtons: false, keyboard: { enabled: false } },
      physics: {
        solver: "forceAtlas2Based",
        forceAtlas2Based: { gravitationalConstant: -62, centralGravity: 0.012, springLength: 130, springConstant: 0.08, damping: 0.5 },
        stabilization: { iterations: 220 },
      },
    };

    const network = new vis.Network(host, { nodes, edges }, options);

    // ---- Legend (from data.graph.legend) ----
    const legendHost = document.getElementById("graph-legend");
    if (legendHost && data.graph.legend) {
      legendHost.innerHTML = data.graph.legend.map((l) =>
        `<span class="key"><span class="swatch" style="background:${l.color};color:${l.color}"></span>${l.label}</span>`
      ).join("");
    }

    // ---- Node detail panel ----
    const info = document.getElementById("node-info");
    function showNode(id) {
      const n = nodes.get(id);
      if (!n || !info) return;
      const typeLabel = (n._type || "node").toUpperCase();
      info.innerHTML = `<span class="ni-type">[${typeLabel}]</span> <b>${n.label.replace(/\n/g, " ")}</b>` +
                       (n._meta ? `<br>› ${n._meta}` : "");
    }
    network.on("click", (params) => {
      if (params.nodes.length) showNode(params.nodes[0]);
      else if (info) info.innerHTML = "› Click any node to inspect its details.";
    });
    network.on("doubleClick", (params) => {
      if (params.nodes.length) network.focus(params.nodes[0], { scale: 1.4, animation: true });
    });

    // ---- Search: dim everything except matches ----
    const search = document.getElementById("graph-search");
    function applyDim(predicate) {
      nodes.forEach((n) => {
        const match = predicate(n);
        nodes.update({ id: n.id, opacity: match ? 1 : 0.12 });
      });
    }
    function resetDim() { nodes.forEach((n) => nodes.update({ id: n.id, opacity: 1 })); }

    if (search) {
      search.addEventListener("input", () => {
        const q = search.value.trim().toLowerCase();
        if (!q) { resetDim(); return; }
        applyDim((n) => (n.label + " " + (n._meta || "")).toLowerCase().includes(q));
      });
    }

    // ---- Type filter chips ----
    document.querySelectorAll(".chip[data-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip[data-filter]").forEach((c) => {
          c.dataset.active = "false";
          c.style.background = "";
          c.style.color = "";
          c.style.borderColor = "";
        });
        chip.dataset.active = "true";
        const f = chip.dataset.filter;
        const col = TYPE_COLORS[f] || "#39ff14";
        chip.style.background = col;
        chip.style.color = "#05080d";
        chip.style.borderColor = col;
        if (search) search.value = "";
        if (f === "all") { resetDim(); return; }
        // root always stays lit so the map keeps an anchor.
        applyDim((n) => n._type === f || n._type === "root");
      });
    });

    // ---- Reset button ----
    const reset = document.getElementById("graph-reset");
    if (reset) {
      reset.addEventListener("click", () => {
        if (search) search.value = "";
        resetDim();
        network.fit({ animation: true });
        const allChip = document.querySelector('.chip[data-filter="all"]');
        if (allChip) allChip.click();
      });
    }

    network.once("stabilizationIterationsDone", () => {
      network.setOptions({ physics: { enabled: true, forceAtlas2Based: { gravitationalConstant: -45 } } });
      network.fit({ animation: { duration: 600 } });
    });
  });
})();
