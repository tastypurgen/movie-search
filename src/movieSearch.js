import 'regenerator-runtime';
import axios from 'axios';
import Swiper from 'swiper';
import { apiKey, yKey } from './constants';
import params from './swiper.params';
import createCard from './createCard';
import { hideInterface, showInterface, editMessage } from './utils';
import renderMovieDetails from './renderMovieDetails';

const input = document.querySelector('#search');

const mySwiper = new Swiper('.swiper-container', params);
const SLIDER_COUNT = 10;
let page = 1;
let isFirstSearch = true;

async function findMovies(name, isSameSearch = false) {
  hideInterface();

  // handleFirstSearch
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

  let translateReq;
  if (name !== '') translateReq = await axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yKey}&text=${name}&lang=ru-en`);
  const translate = typeof translateReq === 'undefined' ? ' ' : translateReq.data.text[0];

  try {
    // get movies list
    const response = await axios.get(`https://www.omdbapi.com/?s=${translate}&page=${page}&apikey=${apiKey}`);

    if (response.data.totalResults === SLIDER_COUNT) {
      mySwiper.off('slideChange');
    }
    if (response.data.Response === 'False') {
      editMessage(`No results for <b>${name}</b>  ¯\\_(ツ)_/¯`);
      if (name.length < 3) editMessage('Name too short!');
    } else {
      if (name !== translate) editMessage(`Showing results for <b>${translate}</b>`);
      else editMessage();

      // get details for every movie
      const movieDataArray = await Promise.all(
        response
          .data
          .Search.map(async (movie) => {
            const movieData = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
            return movieData;
          }),
      );
      if (page === 1) mySwiper.removeAllSlides();
      movieDataArray.forEach((movieData) => {
        mySwiper.appendSlide(createCard(movieData.data));
      });

      const posters = document.querySelectorAll('.card-poster');
      posters.forEach((poster) => {
        poster.addEventListener('click', (e) => {
          renderMovieDetails(e.target);
        });
      });
    }
  } catch (error) {
    editMessage(error);
  } finally {
    showInterface();
  }
}

export default findMovies;
