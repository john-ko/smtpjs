const _ = require('lodash')

const LOG_LEVELS = {
  'fatal': { value: 50, mapping: 'error' },
  'error': { value: 40, mapping: 'error' },
  'warn': { value: 30, mapping: 'warn' },
  'info': { value: 20, mapping: 'info' },
  'debug': { value: 10, mapping: 'debug' },
}

class Logger {
  /**
   * options object
   *  {
   *    level: 'warn',
   *  }
   * @param {Object} options - options object
   */
  constructor (options = {}) {
    const noop = () => {}

    this.level = _.get(options, 'level', 'fatal')

    this.debug = noop
    this.info = noop
    this.warn = noop
    this.error = noop
    this.fatal = noop

    const levelValue = _.get(LOG_LEVELS, `${this.level}.value`, LOG_LEVELS['fatal'].value)

    Object.entries(LOG_LEVELS).forEach(([key, level]) => {
      if (levelValue <= level.value) {
        this[key] = (message) => {
          console[level.mapping](message)
          return message
        }
      }
    })
  }
}

module.exports = Logger