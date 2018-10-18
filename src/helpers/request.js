const Request = function (url) {
  this.url = url;
}

// this is responsible for retrieving the data
Request.prototype.get = function () {
  // This gets the response and, when it arrives,
  // it converts it to jason:
  return fetch(this.url)
          .then(response => response.json())
          .catch(err => console.log(err));
  // Actually, the previous returns a PROMISE
  // because response.json takes a while (so you get a PROMISE again).
  // The catch returns an error if something goes wrong.
}

module.exports = Request;
