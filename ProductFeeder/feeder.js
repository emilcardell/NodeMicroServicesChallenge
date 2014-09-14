var amqp = require('amqplib');
var when = require('when');
require('sugar');
var shortId = require('shortid');

var FruitNames = ["Banana", "Apple", "Pear", "Kiwi", "Mango", "Pineapple", "Banana"];

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

setInterval(function(){
  
  var fruit = {
    id: shortId.generate(),
    name: FruitNames[randomInt(0, FruitNames.length)],
    amount: randomInt (1, 30),
    expires: Date.create().addMinutes(randomInt(2, 16))
  };

  amqp.connect('amqp://localhost').then(function(conn) {
    return when(conn.createChannel().then(function(ch) {
      var ex = 'logs';
      var ok = ch.assertExchange(ex, 'fanout', {durable: false})

      console.log('In the code doing sruff');

      var message = process.argv.slice(2).join(' ') ||
        'info: Hello World!';

      return ok.then(function() {
        ch.publish(ex, '', new Buffer(JSON.stringify(fruit)));
        console.log(" [x] Sent '%s'", JSON.stringify(fruit));
        return ch.close();
      });

    })).ensure(function() { conn.close(); });
  }).then(null, console.warn);
}, 5000)
