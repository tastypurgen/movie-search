import apiKey from './constants'

const axios = require('axios')

const swiperWrapper = document.querySelector('.swiper-wrapper');

export default function createCard(movie) {
  const movieEl = document.createElement('div');
  movieEl.classList.add('swiper-slide');
  const posterLink = movie.Poster === 'N/A' ? 'img/404.jpg' : movie.Poster;

  axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
    .then(response => {
      console.log('+')
      let rating = rating = response.data.Ratings[0].Value.replace('/10', '')

      movieEl.innerHTML = `
        <div class="card-title"><a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">${movie.Title}</a></div>
        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank"><img class="card-poster" src="${posterLink}"></a>
        <div class="card-year">${movie.Year}</div>
        <div class="card-type">${movie.Type}</div>
        <div class="card-rating">${rating}</div>
      `;
    })
  swiperWrapper.append(movieEl);
}