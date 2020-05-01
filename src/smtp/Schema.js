class Schema {
  constructor (schema = {}) {
    if (schema.data) {
      const data = schema.data()
      Object.entries(data).forEach(([key, value]) => {
        this[key] = value
      })
    }

    if (schema.events) {
      Object.entries(schema.events).forEach(([key, event]) => {
        const handler = event.bind(this)
        this[key] = handler
      })
    }
  }
}

module.exports = Schema