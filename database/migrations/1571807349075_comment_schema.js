'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up() {
    this.create('comments', (table) => {
      table.increments()
      table.integer('commenter_id')
      table.foreign('commenter_id').references('users.id')
      table.integer('event_id')
      table.foreign('event_id').references('events.id')
      table.boolean('is_answer').defaultTo(false)
      table.integer('answer_to')
      table.foreign('answer_to').references('comments.id')
      table.string('title', [100]).notNullable()
      table.string('comment', [1000]).notNullable()
      table.datetime('timestamp', { precision: 6 })
      table.timestamps()
    })
  }

  down() {
    this.drop('comments')
  }
}

module.exports = CommentSchema
