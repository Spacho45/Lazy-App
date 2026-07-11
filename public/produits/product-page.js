document.querySelectorAll('.product-realisation-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.product-realisation-track');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  function move(direction) {
    const card = track.querySelector('.product-realisation-card');
    const gap = 28;
    const amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth * .78;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  }
  prev?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
});
