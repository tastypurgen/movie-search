export default {
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // when window width is >= 450px
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 1000px
    1000: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 6,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
};
