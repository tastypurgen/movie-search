const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');
const loader = document.querySelector('.loading');

export function hideInterface() {
  prevBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  loader.classList.remove('hidden');
}
export function showInterface() {
  prevBtn.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
  loader.classList.add('hidden');
}

export default { hideInterface, showInterface };
