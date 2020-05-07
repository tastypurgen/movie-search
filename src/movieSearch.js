import 'regenerator-runtime';
import apiKey from './constants';
import params from './swiper.params';
import Swiper from './swiper';
import createCard from './createCard';
import { hideInterface, showInterface } from './utils';
import renderMovieDetails from './renderMovieDetails';

const axios = require('axios');

const input = document.querySelector('#search');
const message = document.querySelector('.message-container');


const mySwiper = new Swiper('.swiper-container', params);
let page = 1;
let isFirstSearch = true;

function findMovies(name, isSameSearch = false) {
  hideInterface();
  if (isFirstSearch) {
    isFirstSearch = false;
    page = 1;
    mySwiper.on('slideChange', () => {
      if (mySwiper.isEnd && !mySwiper.isBeginning) {
        findMovies(input.value || 'harry', true);
      }
    });
  }
  if (!isSameSearch) page = 1;
  else page += 1;

  axios.get(`https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${apiKey}`)
    .then((response) => {
      // console.log(response);
      if (response.data.totalResults <= Number(10)) {
        mySwiper.off('slideChange');
      }
      if (response.data.Response === 'False') {
        message.innerHTML = `No results for <b>${name}</b>  ¯\\_(ツ)_/¯`;
      } else {
        message.innerHTML = '';
        response.data.Search.forEach(async (movie) => {
          axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
            .then((movieData) => {
              // console.log(movieData);
              mySwiper.appendSlide(createCard(movieData.data));
              showInterface();
              const posters = document.querySelectorAll('.card-poster');
              posters.forEach((poster) => {
                poster.addEventListener('click', (e) => {
                  renderMovieDetails(e.target);
                });
              });
            })
            .catch((error) => {
              message.innerHTML = error;
              showInterface();
            });
        });
      }
    })
    .catch((error) => {
      if (JSON.stringify(error).includes('Request failed with status code 401')) message.innerHTML = 'Daily limit is reached!:(<br>Please try again tomorrow';
      else {
        message.innerHTML = 'Unknown error! :(';
        // eslint-disable-next-line no-console
        console.log(error);
      }
      showInterface();
    });
}

export default findMovies;
