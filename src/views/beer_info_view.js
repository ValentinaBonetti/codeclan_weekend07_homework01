const PubSub = require('../helpers/pub_sub.js');

const BeerInfoView = function (container) {
  this.container = container;
};

BeerInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:selected-beer', (event) => {
    const beer = event.detail;
    this.renderBeerInfo(beer);
    this.setFavouriteButton(beer);
  })
  PubSub.subscribe('FavouriteBeerView:viewBeerInfoRequested', (event) => {
    const beer = event.detail;
    this.renderBeerInfo(beer);
    this.setDeleteButton(beer);
  })
};

BeerInfoView.prototype.renderBeerInfo = function (beer) {
  this.container.innerHTML = '';
  //
  const gridContainer = document.createElement('div');
  gridContainer.id = "selected-beer-grid-container";
  //
  // beer name and description
  const beerNameAndDescription = document.createElement('div');
  beerNameAndDescription.id = "beer-name-and-description";
  const beerName = document.createElement('h2');
  beerName.textContent = beer.name.toUpperCase();
  beerName.id = "beer-name";
  const paragraph = document.createElement('p');
  paragraph.textContent = beer.description;
  paragraph.id = "beer-description";
  beerNameAndDescription.appendChild(beerName);
  beerNameAndDescription.appendChild(paragraph);
  gridContainer.appendChild(beerNameAndDescription);
  //
  // beer image
  const img = document.createElement('img');
  img.src = beer.image_url;
  img.id = "selected-beer-image";
  gridContainer.appendChild(img);
  //
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
  gridContainer.appendChild(brewSheet);
  //
  this.container.appendChild(gridContainer)
};

BeerInfoView.prototype.setFavouriteButton = function (beer) {
  const putInFavouritesButton = document.createElement('button');
  putInFavouritesButton.textContent = "put in favourites";
  this.container.appendChild(putInFavouritesButton);
  // set addEventListener for the button click and publish something
  // ...from here or where?
  putInFavouritesButton.addEventListener('click', () => {
    PubSub.publish('BeerInfoView:favouriteSelected',beer);
  })
};

BeerInfoView.prototype.setDeleteButton = function (beer) {
  const deleteFromFavouritesButton = document.createElement('button');
  deleteFromFavouritesButton.textContent = "delete from favourites";
  this.container.appendChild(deleteFromFavouritesButton);
  // set addEventListener for the button click and publish something
  // ...from here or where?
  deleteFromFavouritesButton.addEventListener('click', () => {
    const beerToBeDeleted = document.querySelector(`#image-beerid-${beer.id}`);
    beerToBeDeleted.remove();
  })
};

module.exports = BeerInfoView;
