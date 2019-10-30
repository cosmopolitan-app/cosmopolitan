'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  city() {
    return this.belongsTo('App/Models/City')
  }

  sessions() {
    return this.hasMany('App/Models/Session')
  }

  setTags(obj) {
    return JSON.stringify(obj)
  }

  speakers() {
    return this.hasMany('App/Models/Speaker')
  }
}

module.exports = Event
