const PubSub = require('../helpers/pub_sub.js');

const FavouriteBeerView = function () {

};

FavouriteBeerView.prototype.createBeerView = function (beer) {
  const beerView = document.createElement('img');
  beerView.classList.add('favourite-beer-image');
  beerView.id = `image-beerid-${beer.id}`;
  beerView.src = beer.image_url;
  beerView.addEventListener('click', () => {
    PubSub.publish('FavouriteBeerView:viewBeerInfoRequested',beer);
  })
  return beerView;
};

module.exports = FavouriteBeerView;
