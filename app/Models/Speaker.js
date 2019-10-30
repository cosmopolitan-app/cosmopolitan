'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Speaker extends Model {
  sessions() {
    return this.belongsToMany('App/Models/Session')
  }

  events() {
    return this.belongsToMany('App/Models/Event')
  }
}

module.exports = Speaker
