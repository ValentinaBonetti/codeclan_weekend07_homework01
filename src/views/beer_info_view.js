const PubSub = require('../helpers/pub_sub.js');

const BeerInfoView = function (container) {
  this.container = container;
};

BeerInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:selected-beer', (event) => {
    const beer = event.detail;
    this.render(beer);
  })
};

BeerInfoView.prototype.render = function (beer) {
  this.container.innerHTML = '';

  const beerName = document.createElement('h2');
  beerName.textContent = beer.name.toUpperCase();
  this.container.appendChild(beerName);

  const img = document.createElement('img');
  img.src = beer.image_url;
  img.id = "selected-beer-image";
  this.container.appendChild(img);

  const paragraph = document.createElement('p');
  paragraph.textContent = beer.description;
  this.container.appendChild(paragraph);

  // brewSheet table

  const brewSheet = document.createElement('div');
  brewSheet.textContent = "BREW SHEET";
  brewSheet.id = "brewSheet";

  const table = document.createElement('table');
  table.id = "brewTable";
  brewSheet.appendChild(table);

  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  const tr1 = document.createElement('tr');
  tableBody.appendChild(tr1);
  const td1_1 = document.createElement('td');

  const img_td1_1 = document.createElement('img');
  img_td1_1.classList.add('brew-sheet-image');
  img_td1_1.src = "https://www.brewdog.com/images/icons/abv.png";
  td1_1.appendChild(img_td1_1);
  tr1.appendChild(td1_1);

  const td1_2 = document.createElement('td');
  td1_2.textContent = `ABV: ${beer.abv} %`;
  tr1.appendChild(td1_2);

  this.container.appendChild(brewSheet);

  // end of brewSheet table


};

module.exports = BeerInfoView;
