const Beers = require('./models/beers.js');
const SelectBeerView = require('./views/select_beer_view.js');
const BeerInfoView = require('./views/beer_info_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const selectElement = document.querySelector('#beer-select');
  const selectBeerView = new SelectBeerView(selectElement);
  selectBeerView.bindEvents();

  const beers = new Beers;
  beers.bindEvents();
  beers.getData();

  const infoDiv = document.querySelector('#selected-beer-info');
  const beerInfoDisplay = new BeerInfoView(infoDiv);
  beerInfoDisplay.bindEvents();



});
