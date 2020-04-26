import findMovies from './findMovies'

const searchInput = document.querySelector('#search')

findMovies('harry')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const mySwiper = document.querySelector('.swiper-container').swiper;
  const search = searchInput.value.trim()
  mySwiper.destroy()
  findMovies(search)
})

