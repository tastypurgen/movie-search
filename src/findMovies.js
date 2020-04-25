import swiper from './swiper.init'

const axios = require('axios');

const swiperWrapper = document.querySelector('.swiper-wrapper')


export default (name) => {
  swiperWrapper.innerHTML = '';

  axios.get(`http://www.omdbapi.com/?s=${name}&apikey=97782f03`)
    .then(function (response) {
      // handle success
      response.data.Search.forEach(movie => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('swiper-slide')

        movieEl.innerHTML = `
        <img src="${movie.Poster}" style="width: 100%;">
      `
        movie.Poster === 'N/A' ? '' : swiperWrapper.append(movieEl)
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