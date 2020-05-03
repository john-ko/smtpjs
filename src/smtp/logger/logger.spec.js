const Logger = require('./logger')

describe('logger', () => {
  it('when custom level is not set', () => {
    const options = {}
    const log = new Logger(options)
    log.info('hello world')
  })

  it('when level is warn it logs warnings and up', () => {
    const options = {
      level: 'warn',
    }

    const log = new Logger(options)

    const error = log.error('error')
    const warn = log.warn('warn')
    const info = log.info('info')

    expect(error).toBe('error')
    expect(warn).toBe('warn')
    expect(info).toBe(undefined)

    console.log(process.env.NODE_ENV)
  })
})