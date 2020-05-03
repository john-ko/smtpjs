const _ = require('lodash')

class Schema {
  constructor (schema = {}) {
    if (schema.config) {
      const config = _.cloneDeep(schema.config)
      this.setter(config).bind(this)
    }

    if (schema.data) {
      const data = schema.data()
      this.setter(data).bind(this)
    }

    if (schema.events) {
      this.setter(schema.events).bind(this)
    }
  }

  setter (object = {}) {
    Object.entries(object).forEach(([key, value]) => {
      if (typeof value === 'function') {
        value.bind(this)
      }

      this[key] = value
    })
  }

  static factory (schema) {
    return new Schema(schema)
  }
}

module.exports = Schema