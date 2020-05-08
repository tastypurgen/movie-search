import movieSearch from './movieSearch';

const searchInput = document.querySelector('#search');
const clearBtn = document.querySelector('.clear');

movieSearch('harry');

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const search = searchInput.value.trim();
  movieSearch(search);
});
