'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up() {
    this.create('files', (table) => {
      table.increments()
      table
        .string('name')
        .notNullable()
        .defaultTo('')
      table
        .string('mime')
        .notNullable()
        .defaultTo('')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('files')
  }
}

module.exports = FileSchema
