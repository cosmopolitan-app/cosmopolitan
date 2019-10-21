'use strict'

const Session = use('App/Models/Session')

class SessionController {
  index({ request }) {
    const { page = 1, query = '' } = request.get()
    return Session.query()
      .with('event')
      .where('title', 'ilike', `%${query}%`)
      .orderBy('id', 'desc')
      .paginate(+page)
  }

  show({ request }) {
    const { id } = request.params
    return Session.query()
      .with('event')
      .where('id', id)
      .firstOrFail(id)
  }

  async store({ request }) {
    // TODO: verify all
    const data = request.all()

    const session = await Session.create(data)

    return Session.query()
      .with('event')
      .where('id', session.id)
      .firstOrFail(session.id)
  }

  async update({ request }) {
    // TODO: verify all
    const data = request.all()

    const { id } = request.params
    const session = await Session.findOrFail(id)

    session.merge(data)
    await session.save()

    return Session.query()
      .with('event')
      .where('id', session.id)
      .firstOrFail(session.id)
  }

  async destroy({ request }) {
    const { id } = request.params
    const session = await Session.findOrFail(id)

    await session.delete()
  }
}

module.exports = SessionController
