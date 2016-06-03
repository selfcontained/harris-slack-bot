var Botkit = require('botkit')
var BeepBoop = require('beepboop-botkit')
var dictionary = require('./messages/')

var controller = Botkit.slackbot({
  debug: false
})

var beepboop = BeepBoop.start(controller, {
  debug: true
})

require('./sayings/')(controller, dictionary)
require('./chores/')(controller, beepboop, dictionary)

setInterval(() => {
  console.log('Logging testing: ' + Date.now())
}, 1000)
