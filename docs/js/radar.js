/* =============================================================
   radar.js — skill-domain radar (spider) chart via Chart.js.
   Reads data.domains (key/label/score) from resume-data.json.
   ============================================================= */

(function () {
  document.addEventListener("resume:ready", (ev) => {
    const data = ev.detail;
    const canvas = document.getElementById("radar-canvas");
    if (!canvas || typeof Chart === "undefined") {
      console.warn("Chart.js not available or #radar-canvas missing.");
      return;
    }

    const labels = data.domains.map((d) => d.label);
    const scores = data.domains.map((d) => d.score);

    new Chart(canvas.getContext("2d"), {
      type: "radar",
      data: {
        labels,
        datasets: [{
          label: "Proficiency (0–5)",
          data: scores,
          fill: true,
          backgroundColor: "rgba(57, 255, 20, 0.14)",
          borderColor: "#39ff14",
          borderWidth: 2,
          pointBackgroundColor: "#ff2e63",
          pointBorderColor: "#ffffff",
          pointHoverBackgroundColor: "#00e5ff",
          pointRadius: 4,
          pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#aab6c2", font: { family: "JetBrains Mono" } } },
          tooltip: {
            backgroundColor: "#0a1018",
            borderColor: "#39ff14",
            borderWidth: 1,
            titleColor: "#39ff14",
            bodyColor: "#e4eaf0",
          },
        },
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: { stepSize: 1, color: "#8c98a4", backdropColor: "transparent", showLabelBackdrop: false },
            grid: { color: "rgba(0, 229, 255, 0.12)" },
            angleLines: { color: "rgba(0, 229, 255, 0.16)" },
            pointLabels: { color: "#aeb9c4", font: { family: "JetBrains Mono", size: 11 } },
          },
        },
      },
    });
  });
})();
