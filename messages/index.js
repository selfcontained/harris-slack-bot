var messages = require('./messages')

module.exports = function (key) {
  key = (key || '').toUpperCase()

  var value = messages[key]

  if (!value) {
    return 'I got nothin...'
  }

  if (Array.isArray(value)) {
    return value[Math.floor(Math.random() * value.length)]
  }

  return value
}
