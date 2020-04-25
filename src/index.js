import findMovies from './findMovies'

const searchInput = document.querySelector('#search')

// findMovies('truman')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const search = searchInput.value
  findMovies(search)
})

