const PubSub = require('../helpers/pub_sub.js');


const ChartView = function (container) {
  this.container = container;
};

ChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:all-beers-ready', (event) => {
    this.drawABVgraph(event.detail);
  });
}


ChartView.prototype.drawABVgraph = function (allBeers) {
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var beersABVData = [];
        allBeers.forEach((beer) => beersABVData.push([beer.name,beer.abv]));
        console.log(beersABVData);

        beersABVData.unshift(['Beer','ABV']);
        var data = google.visualization.arrayToDataTable(beersABVData);

        var options = {
          title: 'General distribution of ABV (Alcohol By Volume)',
          legend: { position: 'none' },
          histogram: {
            bucketSize: 0.1,
            maxNumBuckets: 40,
            minValue: 0,
            maxValue: 10,
            lastBucketPercentile: 2
          }
        };

        var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
        chart.draw(data, options);
        }
  };

module.exports = ChartView;
