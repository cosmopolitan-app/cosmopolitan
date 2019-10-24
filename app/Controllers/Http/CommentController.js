'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
  index({ request }) {
    const { page = 1, CommenterId, EventId } = request.get()

    let query = Comment.query()

    if (CommenterId) {
      query = query.andWhere('commenter_id', 'ilike', CommenterId)
    }

    if (EventId) {
      query = query.andWhere('event_id', 'ilike', EventId)
    }

    return query.orderBy('id', 'desc').paginate(+page)
  }

  answers({ request }) {
    const { page = 1, AnswerTo } = request.get()
    return Comment.query()
      .where('answer_to', 'ilike', AnswerTo)
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
