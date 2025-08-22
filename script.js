document.getElementById("year")?.append(new Date().getFullYear());

// ----- Lightbox for tiles -----
(() => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const video = document.getElementById('lb-video');
  const title = document.getElementById('lb-title');
  const close = lb.querySelector('.lb-close');

  const open = (src, label) => {
    video.src = src;
    title.textContent = label || '';
    lb.hidden = false;
    // slight async to ensure visibility before play
    setTimeout(() => video.play().catch(() => {}), 50);
  };
  const shut = () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
    lb.hidden = true;
  };

  document.addEventListener('click', (e) => {
    const tile = e.target.closest('.tile');
    if (tile) {
      const src = tile.dataset.src;
      const label = tile.dataset.title;
      if (src) open(src, label);
    }
  });
  close?.addEventListener('click', shut);
  lb.addEventListener('click', (e) => {
    if (e.target === lb) shut();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lb.hidden) shut();
  });
})();
