(function () {
  if (!document.body || !document.getElementById("privacy-policy-printable")) return;
  var btn = document.getElementById("pp-print-btn");
  if (btn) btn.addEventListener("click", function () { window.print(); });
})();