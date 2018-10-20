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
  // munros.forEach((munro) => {
  //   const munroItem = this.createMunroListItem(munro);
  //   this.container.appendChild(munroItem);
  // });
  console.log(beer);
};

// MunroListView.prototype.createMunroListItem = function (munro) {
//   const munroDetailView = new MunroDetailView();
//   const munroDetail = munroDetailView.createMunroDetail(munro);
//   return munroDetail;
// };

module.exports = FavouritesListView;
