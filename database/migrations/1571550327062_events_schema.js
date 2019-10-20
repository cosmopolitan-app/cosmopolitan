'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up() {
    this.create('events', (table) => {
      table.increments()
      table.integer('city_id').unsigned()
      table.foreign('city_id').references('cities.id')
      table.datetime('start', { precision: 6 }).notNullable()
      table.datetime('end', { precision: 6 })
      table
        .boolean('open')
        .notNullable()
        .defaultTo(true)
      table
        .string('title')
        .notNullable()
        .defaultTo('')
      table
        .text('description')
        .notNullable()
        .defaultTo('')
      table
        .text('location')
        .notNullable()
        .defaultTo('')
      table.jsonb('tags').defaultTo(JSON.stringify([]))

      table.timestamps()
    })
  }

  down() {
    this.drop('events')
  }
}

module.exports = EventsSchema
