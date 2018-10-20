const PubSub = require('../helpers/pub_sub.js');
const FavouriteBeerView = require('./favourite_beer_view.js');

const FavouritesListView = function (container) {
  this.container = container;
};



FavouritesListView.prototype.bindEvents = function () {
  PubSub.subscribe('BeerInfoView:favouriteSelected', (event) => {
    this.renderFavouriteBeerViews(event.detail);
  });
};

FavouritesListView.prototype.renderFavouriteBeerViews = function (beer) {
  const beerItem = this.createBeerItem(beer);
  this.container.appendChild(beerItem);
  }


FavouritesListView.prototype.createBeerItem = function (beer) {
  const favouriteBeerView = new FavouriteBeerView();
  const beerView = favouriteBeerView.createBeerView(beer);
  return beerView;
};

module.exports = FavouritesListView;
