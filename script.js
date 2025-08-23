// Lightweight lightbox for any .card-btn (data-src, data-title)
(function () {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const video = document.getElementById('lb-video');
  const title = document.getElementById('lb-title');
  const btnClose = document.getElementById('lb-close');

  function open(src, caption) {
    video.src = src;
    title.textContent = caption || '';
    lb.hidden = false;
    video.play().catch(() => {});
    document.body.style.overflow = 'hidden';
  }
  function close() {
    video.pause();
    video.removeAttribute('src');  // stop download
    video.load();
    lb.hidden = true;
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-btn');
    if (btn) {
      open(btn.dataset.src, btn.dataset.title);
    }
  });
  btnClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) close(); });
})();
