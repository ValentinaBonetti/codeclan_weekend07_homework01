const Beers = require('./models/beers.js');
const SelectBeerView = require('./views/select_beer_view.js');
const BeerInfoView = require('./views/beer_info_view.js');
const FavouritesListView = require('./views/favourites_list_view.js');
const FavouriteBeerView = require('./views/favourite_beer_view.js');
const SelectFoodView = require('./views/select_food_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const selectBeerElement = document.querySelector('#beer-select');
  const selectBeerView = new SelectBeerView(selectBeerElement);
  selectBeerView.bindEvents();

  const selectFoodElement = document.querySelector('#food-select')
  const selectFoodView = new SelectFoodView(selectFoodElement);
  selectFoodView.bindEvents();

  const infoDiv = document.querySelector('#selected-beer-info');
  const beerInfoDisplay = new BeerInfoView(infoDiv);
  beerInfoDisplay.bindEvents();

  const favouritesDiv = document.querySelector("#favourite-beers-container");
  const favouritesListView = new FavouritesListView(favouritesDiv);
  favouritesListView.bindEvents();

  const beers = new Beers;
  beers.bindEvents();
  beers.getData();


});
