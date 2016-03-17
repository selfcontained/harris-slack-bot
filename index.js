var Botkit = require('botkit')
var BeepBoop = require('beepboop-botkit')
var dictionary = require('./messages/')

var controller = Botkit.slackbot({
  debug: false
})

var beepboop = BeepBoop.start(controller, {
  debug: true
})

// connect the bot to a stream of messages
controller.spawn({
  token: slackToken
}).startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Error connecting to slack: ', err)
  }

  console.log('Connected to slack')
})

require('./sayings/')(controller, dictionary)

var chores = (process.env.CHORES || '').split(',')
var choresMembers = (process.env.CHORES_MEMBERS || '').split(',')

if (chores && choresMembers) {
  require('./chores/')(controller, dictionary, {
    chores: chores,
    members: choresMembers
  })
}
