var Botkit = require('botkit')
var dictionary = require('./messages/')

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN
if (!slackToken) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
}

var controller = Botkit.slackbot({
  debug: false
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
