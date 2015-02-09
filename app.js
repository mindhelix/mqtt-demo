/**
 * MQTT broker implementation
 *
 * @author: Jinsu Mathew <jinsu@mindhelix.com>
 * @date: 22/01/2015
 */


var mosca = require('mosca');


/*var pubsubsettings = {
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqttbox',
  pubsubCollection: 'mqttbuffer',
  mongo: {}
};*/

var pubsubsettings = {
  type: 'redis',
  redis: require('redis'),
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};


var moscaSettings = {
  port: 1883,
  backend: pubsubsettings
};


// Create Mosca server
var server = new mosca.Server(moscaSettings);
server.on('ready', function() {
  console.log('Mosca server is running on port 1883');
});


/**
 * Mosca events
 */

// On client connect
server.on('clientConnected', function(client) {
  console.log('Client Connected:', client.id);
});

// On client disconnect
server.on('clientDisconnected', function(client) {
  console.log('Client Disconnected:', client.id);
});



// When a message is published
server.on('published', function(packet, client) {
  if (typeof client !== 'undefined' && client !== null) {
    console.log('Published - Topic: ' + packet.topic + ', Message: ' + packet.payload.toString());
  }
});
