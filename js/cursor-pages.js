(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  var cursor = document.getElementById('customCursor');
  if (!cursor) return;
  document.addEventListener('pointermove', function (event) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
    cursor.style.opacity = '1';
    var target = event.target && event.target.closest ? event.target : document.body;
    cursor.classList.toggle('is-purple', !!target.closest('.soon-button--primary:hover, .button:hover'));
  });
  document.addEventListener('mouseout', function (event) { if (!event.relatedTarget) cursor.style.opacity='0'; });
  window.addEventListener('blur', function () { cursor.style.opacity='0'; });
})();
