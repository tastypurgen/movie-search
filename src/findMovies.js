import params from './swiper.params';
import Swiper from './swiper';
import "regenerator-runtime/runtime";

const axios = require('axios');

const message = document.querySelector('.message-container');
const swiperWrapper = document.querySelector('.swiper-wrapper');

export default (name) => {
  axios.get(`https://www.omdbapi.com/?s=${name}&apikey=97782f03`)
    .then((response) => {
      // console.log(response)
      if (response.data.Response === 'False') {
        message.innerHTML = `No results for <b>${name}</b>  ¯\\_(ツ)_/¯`;
      } else {
        const mySwiper = document.querySelector('.swiper-container').swiper;
        if (mySwiper) {
          mySwiper.destroy();
          swiperWrapper.innerHTML = '';
        }
        response.data.Search.forEach((movie, i) => {
          message.innerHTML = '';
          const movieEl = document.createElement('div');
          movieEl.classList.add('swiper-slide');
          const posterLink = movie.Poster === 'N/A' ? 'img/404.jpg' : movie.Poster;

          axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=97782f03`)
            .then(response => {
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
        });

        new Swiper('.swiper-container', params);
      }
    })
    .catch((error) => {
      message.innerHTML = error;
    });
};
