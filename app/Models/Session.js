'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Session extends Model {
  event() {
    return this.belongsTo('App/Models/Event')
  }

  speaker() {
    return this.hasOne('App/Models/Speaker')
  }
}

module.exports = Session
