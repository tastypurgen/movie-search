export default function createCard(movie) {
  const posterLink = movie.Poster === 'N/A' ? 'img/404.jpg' : movie.Poster;

  const rating = movie.Ratings.length < 1 ? 'n/a' : movie.Ratings[0].Value.replace('/10', '');

  return `
    <div class="swiper-slide">
      <div class="card-title"><a href="https://www.imdb.com/title/${movie.imdbID}/videogallery/" target="_blank">${movie.Title}</a></div>
      <img class="card-poster" onerror="this.onerror=null; this.src='${'img/404.jpg'}';" src="${posterLink}" alt=""></img>
      <div class="card-year">${movie.Year}</div>
      <div class="card-type">${movie.Type}</div>
      <div class="card-rating">${rating}</div>
    </div>
  `;
}
