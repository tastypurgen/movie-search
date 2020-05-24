const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');
const loader = document.querySelector('.loading');
const message = document.querySelector('.message-container');

export function editMessage(msg = '') {
  message.innerHTML = msg;
}
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
