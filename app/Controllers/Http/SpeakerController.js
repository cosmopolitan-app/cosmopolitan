'use strict'

const Speaker = use('App/Models/Speaker')

class SpeakerController {
  index({ request }) {
    const { page = 1, eventId } = request.get()
    return Speaker.query()
      .where('event_id', eventId)
      .paginate(+page)
  }
  show({ request }) {
    const { id } = request.params
    return Speaker.query()
      .with('event')
      .with('session')
      .where({ id })
      .firstOrFail()
  }
  async store({ request, auth, response }) {
    const currentUser = auth.current.user
    const hasAuth = ['admin', 'event-manager'].includes(currentUser)
    if (!hasAuth) {
      return response.status(403).send('Forbidden')
    }
    const data = request.all()
    const speaker = await Speaker.create(data)
    await speaker.reload()
    return speaker
  }
  async update({ request, auth, response }) {
    const currentUser = auth.current.user
    const hasAuth = ['admin', 'event-manager'].includes(currentUser)
    if (!hasAuth) {
      return response.status(403).send('Forbidden')
    }
    const data = request.all()
    const { id } = request.params
    const speaker = await Speaker.findOrFail(id)
    speaker.merge(data)
    await speaker.save()
    return speaker
  }
  async destroy({ request, auth, response }) {
    const currentUser = auth.current.user
    const hasAuth = ['admin', 'event-manager'].includes(currentUser)
    if (!hasAuth) {
      return response.status(403).send('Forbidden')
    }
    const { id } = request.params
    const speaker = await Speaker.findOrFail(id)
    await speaker.delete()
  }
}

module.exports = SpeakerController
