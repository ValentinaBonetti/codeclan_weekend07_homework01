const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Beers = function () {
  this.beersData = [];
}

Beers.prototype.bindEvents = function () {
  PubSub.subscribe('SelectBeerView:change', (event) => {
    const selectedBeerIndex = event.detail;
    this.publishBeerByIndex(selectedBeerIndex);
  })
};

Beers.prototype.getData = function () {
  const request = new Request('https://api.punkapi.com/v2/beers?per_page=80');
  request.get().then(data => {
    this.beersData = data;
    PubSub.publish('Beers:all-beers-ready',this.beersData);

  })
};

Beers.prototype.publishBeerByIndex = function (index) {
  const selectedBeer = this.beersData.filter(beer => {return beer.id == index});
  PubSub.publish('Beers:selected-beer',selectedBeer[0])
};

module.exports = Beers;
