
module.exports = function (controller, dictionary) {
  controller.hears('how are you', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    bot.startConversation(message, function (err, convo) {
      if (err) {
        return console.log(err)
      }

      convo.ask("I'm doing great, how are you?", [
        {
          pattern: 'good',
          callback: function (resp, convo) {
            convo.say("That's good to hear. :smile:")
            convo.next()
          }
        },
        {
          pattern: 'bad',
          callback: function (resp, convo) {
            convo.say("I'm sorry to hear that.  Feel better :hugging_face:")
            convo.next()
          }
        },
        {
          default: true,
          callback: function (response, convo) {
            convo.say("I don't really know what you said, but I hope you're feeling ok. :smile:")
            convo.next()
          }
        }
      ])
    })
  })

  controller.hears('ugly sweater', ['ambient'], function (bot, message) {
    bot.reply(message, 'https://dl.dropboxusercontent.com/u/4286295/IMG_0281.jpg?idx=' + Date.now())
  })

  controller.hears('dad', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('DAD'))
  })

  controller.hears('mom', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('MOM'))
  })

  controller.hears('devin', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('DEVIN'))
  })

  controller.hears('reese', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('REESE'))
  })

  controller.hears('asher', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('ASHER'))
  })

  controller.hears('kellan', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('KELLAN'))
  })

  controller.hears('bannana', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('BANNANA'))
  })

  controller.hears('star wars', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('STAR_WARS'))
  })

  controller.hears('bacon', ['ambient'], function (bot, message) {
    bot.reply(message, dictionary('BACON'))
  })
}
