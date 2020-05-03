const _ = require('lodash')
const util = require('util')
const kleur = require('kleur')

const LOG_LEVELS = {
  'fatal': { value: 50, mapping: 'error' },
  'error': { value: 40, mapping: 'error' },
  'warn': { value: 30, mapping: 'warn' },
  'info': { value: 20, mapping: 'info' },
  'debug': { value: 10, mapping: 'debug' },
  'all': { value: 0, mapping: 'log' },
}

const COLOR_MAPPINGS = {
  'fatal': kleur.red().inverse,
  'error': kleur.red,
  'warn': kleur.yellow,
  'debug': kleur.magenta,
  'info': kleur.green
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

    this.level = _.get(options, 'level', 'error')

    this.debug = noop
    this.info = noop
    this.warn = noop
    this.error = noop
    this.fatal = noop

    const levelValue = _.get(LOG_LEVELS, `${this.level}.value`, LOG_LEVELS['fatal'].value)

    Object.entries(LOG_LEVELS).forEach(([key, level]) => {
      if (levelValue <= level.value) {
        this[key] = (message) => {
          console[level.mapping](Logger.formatted(key, message))
          return message
        }
      }
    })
  }

  static formatted (type = '', message) {
    if (typeof message === 'object') {
      message = util.inspect(message, { showHidden: false, depth: 2, colors: kleur.enabled, breakLength: Number.POSITIVE_INFINITY })
    }

    const timestamp = kleur.grey(`[${new Date().toISOString()}]`)
    const levelColor = COLOR_MAPPINGS[type]
    const level = `[${type.toUpperCase()}]`.padEnd(7)

    return `${timestamp} ${levelColor(level)} - ${message}`
  }
}

module.exports = Logger

// const log = new Logger({ level: 'all'})

// log.info('info')
// log.warn('warn')
// log.debug('debug')
// log.error('error')
// log.fatal('fatal')
// log.info({ a: true, b: 'string', c: 3})