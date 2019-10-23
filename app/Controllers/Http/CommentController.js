'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
  index({ request }) {
    const { page = 1, query = '' } = request.get()
    return Comment.query()
      .where((q) => {
        q.orWhere('commenter', 'ilike', `%${query}%`)
        q.orWhere('event_id', 'ilike', `%${query}%`)
      })
      .orderBy('id', 'desc')
      .paginate(+page)
  }

  show({ request }) {
    const { id } = request.params
    return Comment.query()
      .with('events')
      .where('id', id)
      .firstOrFail(id)
  }

  async store({ request }) {
    const data = request.all()

    const comment = await Comment.create(data)

    return Comment.query()
      .with('events')
      .where('id', comment.id)
      .firstOrFail(comment.id)
  }

  async update({ request }) {
    const data = request.all()

    const { id } = request.params
    const comment = await Comment.findOrFail(id)

    comment.merge(data)
    await comment.save()

    return Comment.query()
      .with('events')
      .where('id', comment.id)
      .firstOrFail(comment.id)
  }

  async destroy({ request }) {
    const { id } = request.params
    const comment = await Comment.findOrFail(id)

    await comment.delete()
  }
}

module.exports = CommentController
