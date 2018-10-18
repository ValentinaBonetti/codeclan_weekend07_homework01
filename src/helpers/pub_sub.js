const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    console.log(`Published on ${channel}: ${event.detail}`);
    document.dispatchEvent(event);
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
    console.log(`Subscribed to ${channel}`);
  }
};

module.exports = PubSub;
