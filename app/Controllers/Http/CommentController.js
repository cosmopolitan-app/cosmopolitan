'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
  index({ request }) {
    const { page = 1, commenterId, eventId } = request.get()

    let query = Comment.query()

    if (commenterId) {
      query = query.andWhere('commenter_id', commenterId)
    }

    if (eventId) {
      query = query.andWhere('event_id', eventId)
    }

    return query.orderBy('id', 'desc').paginate(+page)
  }

  replies({ request }) {
    const { page = 1, id } = request.params
    return Comment.query()
      .where('answer_to', id)
      .orderBy('id', 'desc')
      .paginate(+page)
  }

  show({ request }) {
    const { id } = request.params
    return Comment.query()
      .with('event')
      .with('user')
      .where('id', id)
      .firstOrFail(id)
  }

  async store({ request }) {
    const data = request.all()

    const comment = await Comment.create(data)

    return Comment.query()
      .with('event')
      .with('user')
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
