const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Beers = function () {
  this.beersData = [];
}

Beers.prototype.bindEvents = function () {
  // PubSub.subscribe()
};

Beers.prototype.getData = function () {
  console.log('been in getData');
  const request = new Request('https://api.punkapi.com/v2/beers');
  request.get().then(data => {
    this.beersData = data;
    PubSub.publish('Beers:all-beers-ready',this.beersData);

  })
};

module.exports = Beers;
