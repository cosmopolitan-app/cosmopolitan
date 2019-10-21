'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SessionSchema extends Schema {
  up() {
    this.create('sessions', (table) => {
      table.increments()
      table
        .integer('event_id')
        .unsigned()
        .notNullable()
      table
        .foreign('event_id')
        .references('events.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('title')
        .notNullable()
        .defaultTo('')
      table
        .enum('type', ['talk', 'tutorial', 'workshop'])
        .notNullable()
        .defaultTo('talk')
      table
        .text('description')
        .notNullable()
        .defaultTo('')
      table.timestamps()
    })
  }

  down() {
    this.drop('sessions')
  }
}

module.exports = SessionSchema
