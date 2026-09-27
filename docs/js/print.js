// Résumé page: reveal and wire the Print button (kept out of the HTML for the strict CSP).
const printBtn = document.getElementById('print-btn');
if (printBtn) {
  printBtn.hidden = false;
  printBtn.addEventListener('click', () => window.print());
}
