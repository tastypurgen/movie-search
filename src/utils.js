const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');
const message = document.querySelector('.message-container');
const loader = document.querySelector('.loading');

export function hideInterface() {
  prevBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  message.classList.add('hidden');
  loader.classList.remove('hidden');
}
export function showInterface() {
  prevBtn.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
  message.classList.remove('hidden');
  loader.classList.add('hidden');
}

export default { hideInterface, showInterface };
