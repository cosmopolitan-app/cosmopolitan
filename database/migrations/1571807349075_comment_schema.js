'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up() {
    this.create('comments', (table) => {
      table.increments()
      table
        .integer('commenter_id')
        .unsigned()
        .notNullable()
      table
        .foreign('commenter_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('event_id')
        .unsigned()
        .notNullable()
      table
        .foreign('event_id')
        .references('events.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('reply_to').unsigned()
      table.foreign('reply_to').references('comments.id')
      table.string('title', [100]).notNullable()
      table.string('comment', [1000]).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('comments')
  }
}

module.exports = CommentSchema
