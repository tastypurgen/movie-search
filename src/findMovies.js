import swiper from './swiper.init'

const axios = require('axios');

const swiperWrapper = document.querySelector('.swiper-wrapper')


export default (name) => {
  swiperWrapper.innerHTML = '';

  axios.get(`http://www.omdbapi.com/?s=${name}&apikey=97782f03`)
    .then(function (response) {
      // handle success
      console.log(response)
      response.data.Search.forEach(movie => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('swiper-slide')
        const posterLink = movie.Poster === 'N/A' ? 'img/404.jpg' : movie.Poster
        movieEl.innerHTML = `
        <div class="card-header">${movie.Title}</div>
        <img src="${posterLink}" style="width: 100%;">
        <div class="card-year">${movie.Year}</div>
        <div class="card-rating">${movie.Type}</div>
      `
        swiperWrapper.append(movieEl)
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      swiper()
    });
}