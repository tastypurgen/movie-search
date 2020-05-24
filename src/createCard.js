export default function createCard({
  Poster, Ratings, Year, Type, Title, Released, Actors, Plot, imdbID,
}) {
  const posterLink = Poster === 'N/A' ? 'img/404.jpg' : Poster;

  const rating = Ratings.length < 1 ? 'n/a' : Ratings[0].Value.replace('/10', '');

  return `
    <div class="swiper-slide">
      <div class="card-title"><a href="https://www.imdb.com/title/${imdbID}/videogallery/" target="_blank">${Title}</a></div>
      <img class="card-poster" onerror="this.onerror=null; this.src='${'img/404.jpg'}';" src="${posterLink}" alt=""></img>
      <div class="card-year">${Year}</div>
      <div class="card-type">${Type}</div>
      <div class="card-rating">${rating}</div>
      <div class="modal-poster hidden">${posterLink}</div>
      <div class="modal-title hidden">${Title}</div>
      <div class="modal-released hidden">${Released}</div>
      <div class="modal-actors hidden">${Actors}</div>
      <div class="modal-plot hidden">${Plot}</div>
    </div>
  `;
}
