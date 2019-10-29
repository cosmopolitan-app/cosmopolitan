'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
  index({ request }) {
    const eventsId = request.params.events_id
    const { page = 1 } = request.get()
    const replyTo = request.get().replies_to

    const query = Comment.query()

    if (replyTo) {
      query.andWhere('reply_to', replyTo)
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

  async update({ request, auth, response }) {
    const currentUser = auth.current.user
    const isAdmin = currentUser.role === 'admin'

    const data = request.all()
    const { id } = request.params
    const comment = await Comment.findOrFail(id)

    if (!isAdmin && comment.commenter_id !== currentUser.id) {
      return response.status(403).send('Forbidden')
    }

    comment.merge(data)
    await comment.save()

    return Comment.query()
      .where('id', comment.id)
      .firstOrFail(comment.id)
  }

  async destroy({ request, auth, response }) {
    const currentUser = auth.current.user
    const isAdmin = currentUser.role === 'admin'

    const { id } = request.params
    const comment = await Comment.findOrFail(id)

    if (!isAdmin && comment.commenter_id !== currentUser.id) {
      return response.status(403).send('Forbidden')
    }

    await comment.delete()
  }
}

module.exports = CommentController
