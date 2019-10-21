'use strict'

const Event = use('App/Models/Event')

class EventController {
  index({ request }) {
    const { page = 1, query = '' } = request.get()
    return Event.query()
      .with('city')
      .where((q) => {
        q.orWhere('title', 'ilike', `%${query}%`)
        q.orWhere('description', 'ilike', `%${query}%`)
        q.orWhere('location', 'ilike', `%${query}%`)
      })
      .orderBy('id', 'desc')
      .paginate(+page)
  }

  show({ request }) {
    const { id } = request.params
    return Event.query()
      .with('sessions')
      .with('city')
      .where('id', id)
      .firstOrFail(id)
  }

  async store({ request }) {
    // TODO: verify all
    const data = request.all()

    const event = await Event.create(data)

    return Event.query()
      .with('city')
      .where('id', event.id)
      .firstOrFail(event.id)
  }

  async update({ request }) {
    // TODO: verify all
    const data = request.all()

    const { id } = request.params
    const event = await Event.findOrFail(id)

    event.merge(data)
    await event.save()

    return Event.query()
      .with('city')
      .where('id', event.id)
      .firstOrFail(event.id)
  }

  async destroy({ request }) {
    const { id } = request.params
    const event = await Event.findOrFail(id)

    await event.delete()
  }
}

module.exports = EventController
