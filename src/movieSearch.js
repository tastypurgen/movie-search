import 'regenerator-runtime';
import axios from 'axios';
import { apiKey, yKey } from './constants';
import Swiper from './swiper';
import params from './swiper.params';
import createCard from './createCard';
import { hideInterface, showInterface, editMessage } from './utils';
import renderMovieDetails from './renderMovieDetails';

const input = document.querySelector('#search');

const mySwiper = new Swiper('.swiper-container', params);
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

  const translateReq = await axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yKey}&text=${name}&lang=ru-en`);
  const translate = translateReq.data.text[0];

  axios.get(`https://www.omdbapi.com/?s=${translate}&page=${page}&apikey=${apiKey}`)
    // get movies list
    .then((response) => {
      // console.log(response);
      if (response.data.totalResults <= Number(10)) {
        mySwiper.off('slideChange');
      }
      if (response.data.Response === 'False') {
        editMessage(`No results for <b>${name}</b>  ¯\\_(ツ)_/¯`);
      } else {
        if (name !== translate) editMessage(`Showing results for <b>${translate}</b>`);
        else editMessage();

        if (page === 1) mySwiper.removeAllSlides();

        // get details for every movie
        response.data.Search.forEach((movie) => {
          axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
            .then((movieData) => {
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
              editMessage(error);
            });
        });
      }
    })
    .catch((error) => {
      if (JSON.stringify(error).includes('Request failed with status code 401')) editMessage('Daily limit is reached!:(<br>Please try again tomorrow');
      else {
        editMessage('Unknown error! :(');
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })
    .then(() => {
      showInterface();
    });
}

export default findMovies;
