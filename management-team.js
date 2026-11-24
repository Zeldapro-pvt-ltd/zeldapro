(function () {
  if (document.body.dataset.mtPage !== "true") return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = document.querySelectorAll(".mt-reveal, .mt-reveal-stagger, .mt-highlight, .mt-tagline__svg");
  if (!reducedMotion && "IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("mt-is-visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("mt-is-visible");
    });
  }

  document.querySelectorAll(".mt-frame").forEach(function (frame) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("mt-is-visible");
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(frame);
  });

  var counterEl = document.querySelector("[data-mt-counter]");
  if (counterEl && !reducedMotion) {
    var target = parseInt(counterEl.getAttribute("data-mt-counter"), 10) || 25;
    var counted = false;
    var counterObs = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting || counted) return;
        counted = true;
        var start = performance.now();
        var duration = 1400;
        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          counterEl.textContent = String(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
          else counterEl.textContent = String(target);
        }
        requestAnimationFrame(tick);
        counterObs.disconnect();
      },
      { threshold: 0.4 }
    );
    counterObs.observe(counterEl.closest(".mt-statement") || counterEl);
  } else if (counterEl) {
    counterEl.textContent = counterEl.getAttribute("data-mt-counter") || "25";
  }

  document.querySelectorAll(".mt-portrait").forEach(function (img) {
    function showMonogram() {
      img.classList.add("mt-img--failed");
      var mono = img.parentElement && img.parentElement.querySelector(".mt-frame__monogram");
      if (mono) mono.removeAttribute("hidden");
    }
    img.addEventListener("error", showMonogram);
  });

})();