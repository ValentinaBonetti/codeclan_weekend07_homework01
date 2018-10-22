const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Beers = function () {
  this.beersData = [];
}

Beers.prototype.bindEvents = function () {
  PubSub.subscribe('SelectBeerView:change', (event) => {
    const selectedBeerIndex = event.detail;
    this.publishBeerByIndex(selectedBeerIndex);
  });
  PubSub.subscribe('SelectFoodView:change', (event) => {
    const selectedFood = event.detail;
    const selectedBeerIndex = this.beersData.filter(beer => {return beer.food_pairing.includes(selectedFood)}).map(beer => beer.id);
    this.publishBeerByIndex(selectedBeerIndex);
  })
  this.drawABVgraph();

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

Beers.prototype.drawABVgraph = function () {

  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

};

module.exports = Beers;
