import movieSearch from './movieSearch';
import createKeyboard from './keyboard';

const searchInput = document.querySelector('#search');
const clearBtn = document.querySelector('.clear');
const keyboardImg = document.querySelector('.keyboard-img');

movieSearch('harry');

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
});

createKeyboard();

keyboardImg.addEventListener('click', () => {
  document.querySelector('.board-container').classList.toggle('hidden');
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const search = searchInput.value.trim();
  movieSearch(search);
});
