import findMovies from './findMovies';

const input = document.querySelector('#search');

let lastSlide = 6;
let page = 2;
export default () => {
  const mySwiper = document.querySelector('.swiper-container').swiper;
  mySwiper.on('slideChange', () => {
    if (mySwiper.activeIndex === lastSlide) {
      findMovies(input.value || 'harry', page);
      page += 1;
      lastSlide += 10;
    }
  });
};
