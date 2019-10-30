'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Speaker extends Model {
  session() {
    return this.hasMany('App/Models/Session')
  }

  event() {
    return this.hasMany('App/Models/Event')
  }
}

module.exports = Speaker
