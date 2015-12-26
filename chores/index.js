var Chores = require('./lib/')

module.exports = function (controller, dictionary, options) {
  var chores = Chores(options)

  var atBot = ['direct_message', 'direct_mention', 'mention']

  controller.hears('show chores', atBot, function (bot, message) {
    var assignedChores = Object.keys(chores.assigned).map(function (member) {
      return ['+', member, 'has', chores.assigned[member].name].join(' ')
    })

    if (assignedChores.length === 0) {
      return bot.reply(message, dictionary('CHORES_NO_ASSIGNED'))
    }

    assignedChores.unshift('```')
    assignedChores.push('```')
    bot.reply(message, assignedChores.join('\n'))
  })

  controller.hears('reset assigned chores', atBot, function (bot, message) {
    chores.resetAssigned()

    bot.reply(message, dictionary('CHORES_CLEARED'))
  })

  controller.hears('reset chores', atBot, function (bot, message) {
    chores.resetChores()

    bot.reply(message, dictionary('CHORES_RESET'))
  })

  controller.hears('show available chores', atBot, function (bot, message) {
    var available = chores.available.map(function (chore) {
      return ['+', chore.name].join(' ')
    })

    if (available.length === 0) {
      return bot.reply(message, dictionary('CHORES_NONE_AVAILABLE'))
    }

    available.unshift('```')
    available.push('```')
    bot.reply(message, dictionary('CHORES_AVAILABLE'))
    bot.reply(message, available.join('\n'))
  })

  controller.hears('give me a chore', atBot, function (bot, message) {
    bot.startConversation(message, function (err, convo) {
      if (err) {
        return console.log(err)
      }

      var askedCounter = 0

      convo.ask(dictionary('CHORES_WHO'), function (resp, convo) {
        var member = (resp.text || '').toLowerCase()

        if (!chores.isMember(member)) {
          if (++askedCounter > 3) {
            convo.say(dictionary('CHORES_NOT_A_MEMBER_MAX'))
            return convo.next()
          }

          convo.say(dictionary('CHORES_NOT_A_MEMBER'))
          convo.repeat()
          return convo.next()
        }

        if (chores.hasChore(member)) {
          convo.say(dictionary('CHORES_HAS_CHORE', { member: member, chore: chores.assigned[member].name }))
          return convo.next()
        }

        convo.next()

        var chore = chores.suggest()

        try {
          chores.assign(member, chore.id)
        } catch (e) {
          console.log('Error assigning chore', e)
          convo.say(dictionary('CHORES_ASSIGN_ERROR', { member: member, chore: chore.name }))
          convo.next()
          return
        }

        console.log('assigned chore %s to %s ', chore.name, member)
        convo.say(dictionary('CHORES_ASSIGNED', { member: member, chore: chore.name }))
        convo.say(dictionary('CHORES_REPORT_COMPLETE'))
        convo.next()
      })
    })
  })

  controller.hears('done with chore', atBot, function (bot, message) {
    bot.startConversation(message, function (err, convo) {
      if (err) {
        return console.log(err)
      }

      var askedCounter = 0

      convo.ask(dictionary('CHORES_WHO'), function (resp, convo) {
        var member = (resp.text || '').toLowerCase()

        if (!chores.isMember(member)) {
          console.log('%s is not a member', member)
          if (++askedCounter > 3) {
            convo.say(dictionary('CHORES_NOT_A_MEMBER_MAX'))
            return convo.next()
          }

          convo.say(dictionary('CHORES_NOT_A_MEMBER'))
          convo.repeat()
          return convo.next()
        }

        if (!chores.hasChore(member)) {
          convo.say(dictionary('CHORES_NO_CHORE', { member: member }))
          return convo.next()
        }

        convo.next()

        chores.complete(member)
        convo.say(dictionary('CHORES_COMPLETE', { member: member }))
      })
    })
  })
}
