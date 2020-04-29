const { COMMANDS } = require('../constants')
const commandsRegexStr = `^(${COMMANDS.join('|')}):? ?(.*)`
const commandsRegex = new RegExp(commandsRegexStr)

module.exports = function parser (line = '') {
  const parsed = commandsRegex.exec(line)
  let full = ''
  let action = ''
  let params = ''

  if (parsed && parsed.length) {
    full = parsed[0],
    action = parsed[1],
    params = parsed[2]
  }

  return {
    full,
    action,
    params,
  }
}
