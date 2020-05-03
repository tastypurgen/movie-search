import apiKey from './constants'
import params from './swiper.params';
import Swiper from './swiper';
import createCard from './createCard'
import "regenerator-runtime/runtime";

const axios = require('axios');

const message = document.querySelector('.message-container');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const loadingImg = document.querySelector('.loading')

export default (name) => {
  loadingImg.classList.remove('hidden')
  axios.get(`https://www.omdbapi.com/?s=${name}&apikey=${apiKey}`)
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
          if (i <= 11) {
            message.innerHTML = '';
            createCard(movie)
          }
        });
        new Swiper('.swiper-container', params);
        loadingImg.classList.add('hidden')
      }
    })
    .catch((error) => {
      message.innerHTML = error;
    });
};
