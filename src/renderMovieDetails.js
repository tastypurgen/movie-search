const movideModal = document.querySelector('.movie-modal');
const closeBtn = document.querySelector('#close-modal');
const poster = document.querySelector('.movie-details__poster img');
const title = document.querySelector('#title');
const actors = document.querySelector('#actors');
const released = document.querySelector('#released');
const plot = document.querySelector('#plot');

function renderMovieDetails(target) {
  movideModal.classList.remove('hidden');
  poster.setAttribute('src', target.parentNode.children[5].innerText);
  title.textContent = target.parentNode.children[6].innerText;
  released.textContent = target.parentNode.children[7].innerText;
  actors.textContent = target.parentNode.children[8].innerText;
  plot.textContent = target.parentNode.children[9].innerText;

  closeBtn.addEventListener('click', () => {
    movideModal.classList.add('hidden');
  });
}

export default renderMovieDetails;
