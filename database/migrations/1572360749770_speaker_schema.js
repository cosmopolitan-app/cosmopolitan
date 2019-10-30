'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpeakerSchema extends Schema {
  up() {
    this.create('speakers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('speakers')
  }
}

module.exports = SpeakerSchema
