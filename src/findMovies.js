import 'regenerator-runtime';
import apiKey from './constants';
import params from './swiper.params';
import Swiper from './swiper';
import createCard from './createCard';
import endSwiperHandler from './endSwiperHandler';
import { hideInterface, showInterface } from './utils';

const axios = require('axios');

const message = document.querySelector('.message-container');

const mySwiper = new Swiper('.swiper-container', params);

export default (name, page = 1) => {
  hideInterface();
  axios.get(`https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${apiKey}`)
    .then((response) => {
      // console.log(response);
      if (response.data.Response === 'False') {
        message.innerHTML = `No results for <b>${name}</b>  ¯\\_(ツ)_/¯`;
      } else {
        message.innerHTML = `Found ${response.data.totalResults} results! :)`;
        response.data.Search.forEach(async (movie) => {
          axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
            .then((movieData) => {
              mySwiper.appendSlide(createCard(movieData.data));
            })
            .catch((error) => {
              message.innerHTML = error;
            });
          showInterface();
        });
      }
      endSwiperHandler();
    });
};
