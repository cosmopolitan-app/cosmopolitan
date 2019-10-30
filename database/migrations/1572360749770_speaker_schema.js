'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpeakerSchema extends Schema {
  up() {
    this.create('speakers', (table) => {
      table.increments()
      table.string('name').notNullable()
      table
        .integer('event_id')
        .unsigned()
        .notNullable()
      table.foreign('event_id').references('events.id')
      table
        .integer('session_id')
        .unsigned()
        .notNullable()
      table.foreign('session_id').references('sessions.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('speakers')
  }
}

module.exports = SpeakerSchema
