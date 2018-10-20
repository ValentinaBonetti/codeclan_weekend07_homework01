const FavouriteBeerView = function () {

};

FavouriteBeerView.prototype.createBeerView = function (beer) {
  const beerView = document.createElement('img');
  beerView.classList.add('favourite-beer-image');
  beerView.src = beer.image_url;
  return beerView;
};

module.exports = FavouriteBeerView;
