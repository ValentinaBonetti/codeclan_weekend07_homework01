const Beers = require('./models/beers.js')
const SelectBeerView = require('./views/select_beer_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const selectElement = document.querySelector('#beer-select');
  const selectBeerView = new SelectBeerView(selectElement);
  selectBeerView.bindEvents();

  const beers = new Beers;
  beers.bindEvents();
  beers.getData();

});
