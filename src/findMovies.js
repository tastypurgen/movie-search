import params from './swiper.params';
import Swiper from './swiper';

const axios = require('axios');


const message = document.querySelector('.message-container');
const swiperWrapper = document.querySelector('.swiper-wrapper');

export default (name) => {
  axios.get(`https://www.omdbapi.com/?s=${name}&apikey=97782f03`)
    .then((response) => {
      if (response.data.Response === 'False') {
        message.innerHTML = `No results for <b>${name}</b>  ¯\\_(ツ)_/¯`;
      } else {
        const mySwiper = document.querySelector('.swiper-container').swiper;
        if (mySwiper) {
          mySwiper.destroy();
          swiperWrapper.innerHTML = '';
        }
        response.data.Search.forEach((movie) => {
          message.innerHTML = '';
          const movieEl = document.createElement('div');
          movieEl.classList.add('swiper-slide');
          const posterLink = movie.Poster === 'N/A' ? 'img/404.jpg' : movie.Poster;
          movieEl.innerHTML = `
            <div class="card-title">${movie.Title}</div>
            <img class="card-poster" src="${posterLink}">
            <div class="card-year">${movie.Year}</div>
            <div class="card-rating">${movie.Type}</div>
          `;
          swiperWrapper.append(movieEl);
        });

        new Swiper('.swiper-container', params);
        // const mySwiper = document.querySelector('.swiper-container').swiper;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
