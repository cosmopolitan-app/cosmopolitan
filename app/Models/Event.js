'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  comments() {
    return this.hasMany('App/Models/Comment')
  }

  city() {
    return this.belongsTo('App/Models/City')
  }

  sessions() {
    return this.hasMany('App/Models/Session')
  }

  setTags(obj) {
    return JSON.stringify(obj)
  }
}

module.exports = Event
