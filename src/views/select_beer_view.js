const PubSub = require('../helpers/pub_sub');

const SelectBeerView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectBeerView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:all-beers-ready', (event) => {
    this.populateSelect(event.detail);
  });

  this.selectElement.addEventListener('change', (event) => {
    const selectedBeerId = event.target.value;
    PubSub.publish('SelectBeerView:change',selectedBeerId);
  })
};

SelectBeerView.prototype.populateSelect = function (allBeers) {
  allBeers.forEach((beer,index) => {
    const option = this.createBeerOption(beer,index);
    this.selectElement.appendChild(option);
  })
};

SelectBeerView.prototype.createBeerOption = function (beer,index) {
  const option = document.createElement('option');
  option.textContent = beer.name;
  option.value = beer.id; // check if more convenient to pass array index;
                          // if not, delete it from arguments.
  return option;
};

module.exports = SelectBeerView;
