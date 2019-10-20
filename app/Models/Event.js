'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  city() {
    return this.belongsTo('App/Models/City')
  }

  setTags(obj) {
    return JSON.stringify(obj)
  }
}

module.exports = Event
