const PubSub = require('../helpers/pub_sub');

const SelectFoodView = function (selectElement) {
  this.selectElement = selectElement;
  this.foods = [];
};

SelectFoodView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:all-beers-ready', (event) => {
    this.populateSelect(event.detail);
  });
  this.selectElement.addEventListener('change', (event) => {
    const selectedFood = event.target.value;
    PubSub.publish('SelectFoodView:change',selectedFood);
  })
};

SelectFoodView.prototype.populateSelect = function (allBeers) {
  allBeers.forEach((beer) => {
    this.createFoodsArray(beer)
  });
  this.foods.filter((food,index,foods) => foods.indexOf(food) === index);
  this.foods.sort();
  this.foods.forEach((food) => {
    const option = this.createFoodOption(food);
    this.selectElement.appendChild(option);
    });
  };

SelectFoodView.prototype.createFoodsArray = function (beer) {
  // console.log(beer.food_pairing);
  beer.food_pairing.forEach((food) => {
    this.foods.push(food);
  });

SelectFoodView.prototype.createFoodOption = function (food) {
  const option = document.createElement('option');
  option.textContent = food;
  option.value = food;
  return option;
  };

};

module.exports = SelectFoodView;
