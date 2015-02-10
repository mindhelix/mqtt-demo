/**
* MQTT client implementation
*
* @author: Jinsu Mathew <jinsu@mindhelix.com>
* @date: 22/01/2015
*/

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');

client.subscribe('foo');
client.publish('foo', 'Hello mqtt!');

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('Topic: ' + topic + ' Message: ' + message.toString());
});

client.end();
