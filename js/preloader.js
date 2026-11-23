/* SEP: загрузка текстур Three.js + первый кадр, без искусственного прогресса. */
window.SepPreloader = (function () {
  'use strict';
  var cover = document.getElementById('sepPreloader');
  var bar = document.getElementById('sepProgressBar');
  var value = document.getElementById('sepProgressValue');
  var track = document.getElementById('sepProgressTrack');
  var message = document.getElementById('sepPreloaderMessage');
  var retry = document.getElementById('sepPreloaderRetry');
  var finished = false;
  var returning = document.documentElement.classList.contains('is-returning');

  function show(number) {
    var percent = Math.max(0, Math.min(100, Math.floor(number)));
    value.textContent = percent + '%';
    bar.style.width = percent + '%';
    track.setAttribute('aria-valuenow', String(percent));
  }
  function update(done, total) {
    if (finished || returning) return;
    // Reserve 100% for a completely rendered scene with ready fonts.
    show(total ? Math.min(99, done / total * 99) : 99);
  }
  function ready(failed) {
    if (finished) return;
    // Fonts are part of first-screen rendering (Exposure heading + logo).
    var fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.resolve(fontsReady).then(function () {
      requestAnimationFrame(function () {
        // The gallery already rendered a complete WebGL frame before calling ready().
        requestAnimationFrame(function () {
          if (finished) return;
          finished = true;
          // The full gallery has rendered and the first-screen fonts have settled.
          // Remember only success; a failed attempt must be retried next time.
          try { localStorage.setItem('sep-gallery-visited-v1', '1'); } catch (_) {}
          document.documentElement.classList.add('gallery-ready');
          document.documentElement.classList.remove('is-loading');
          if (returning) {
            // On subsequent visits, we render the page immediately, but keep
            // the WebGL canvas transparent until it has a fully textured frame.
            cover.remove();
            return;
          }
          show(100);
          cover.classList.add('is-done');
          cover.addEventListener('transitionend', function (event) {
            if (event.target === cover) cover.remove();
          }, { once:true });
        });
      });
    }).catch(function () { fail('Не удалось подготовить первый экран. Обновите страницу.'); });
  }
  function fail(text) {
    if (finished) return;
    if (returning) {
      // Do not resurrect the fullscreen preloader on a return visit.
      // Leave the rest of the page functional even if 3D failed to initialize.
      console.error('SEP: 3D-галерея не загрузилась: ' + text);
      return;
    }
    message.textContent = text;
    message.hidden = false;
    retry.hidden = false;
    retry.onclick = function () { window.location.reload(); };
  }
  return { update:update, ready:ready, fail:fail };
})();
