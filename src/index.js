import findMovies from './findMovies';

const searchInput = document.querySelector('#search');
const clearBtn = document.querySelector('.clear');

findMovies('harry');

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const search = searchInput.value.trim();
  findMovies(search);
});
