const PubSub = require('../helpers/pub_sub');

const SelectBeerView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectBeerView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:all-beers-ready', (event) => {
    this.populateSelect(event.detail);
  });

  this.selectElement.addEventListener('change', (event) => {
    event.preventDefault();
    const selectedBeerId = event.target.value;
    PubSub.publish('SelectBeerView:change',selectedBeerId);
  })
};

SelectBeerView.prototype.populateSelect = function (allBeers) {
  allBeers.forEach((beer) => {
    const option = this.createBeerOption(beer);
    this.selectElement.appendChild(option);
  })
};

SelectBeerView.prototype.createBeerOption = function (beer) {
  const option = document.createElement('option');
  option.textContent = beer.name;
  option.value = beer.id;
  return option;
};

module.exports = SelectBeerView;
