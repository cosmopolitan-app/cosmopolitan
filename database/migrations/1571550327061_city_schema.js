'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up() {
    this.create('cities', (table) => {
      table.increments()
      table
        .string('name')
        .notNullable()
        .defaultTo('')
      table
        .string('country')
        .notNullable()
        .defaultTo('')
      table.string('subcountry').defaultTo('')
    })
  }

  down() {
    this.drop('cities')
  }
}

module.exports = CitySchema
