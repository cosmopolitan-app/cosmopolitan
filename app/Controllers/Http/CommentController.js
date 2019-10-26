'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
  index({ request }) {
    const { eventsId } = request.params
    const { page = 1, replyTo } = request.get()

    const query = Comment.query()

    if (replyTo) {
      query.andWhere({ replyTo })
    }

    return query
      .andWhere('event_id', eventsId)
      .orderBy('created_at')
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
