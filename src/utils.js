const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');
// const message = document.querySelector('.message-container');
const loader = document.querySelector('.loading');

export function hideInterface() {
  prevBtn.classList.add('swiper-button-disabled');
  nextBtn.classList.add('swiper-button-disabled');
  // message.classList.add('hidden');
  loader.classList.remove('hidden');
}
export function showInterface() {
  prevBtn.classList.remove('swiper-button-disabled');
  nextBtn.classList.remove('swiper-button-disabled');
  // message.classList.remove('hidden');
  loader.classList.add('hidden');
}

export default { hideInterface, showInterface };
