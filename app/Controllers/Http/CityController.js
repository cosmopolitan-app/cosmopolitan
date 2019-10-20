'use strict'

const City = use('App/Models/City')

class CityController {
  index({ request }) {
    const { page = 1, query = '' } = request.get()
    return City.query()
      .where((q) => {
        q.orWhere('name', 'ilike', `%${query}%`)
        q.orWhere('country', 'ilike', `%${query}%`)
        q.orWhere('subcountry', 'ilike', `%${query}%`)
      })
      .orderBy('id', 'desc')
      .paginate(+page)
  }
}

module.exports = CityController
