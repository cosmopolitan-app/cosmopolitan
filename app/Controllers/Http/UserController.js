'use strict'

const User = use('App/Models/User')

class UserController {
  index({ request }) {
    const { page = 1 } = request.get()
    return User.query().paginate(+page)
  }

  show({ request }) {
    const { id } = request.params
    return User.findOrFail(id)
  }

  async store({ request }) {
    // TODO: verify duplicate email
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    await user.reload()

    return user
  }

  async update({ request }) {
    // TODO: verify duplicate email
    const data = request.only(['name', 'email', 'password'])

    const { id } = request.params
    const user = await User.findOrFail(id)

    user.merge(data)
    await user.save()

    return user
  }

  async destroy({ request }) {
    const { id } = request.params
    const user = await User.findOrFail(id)
    await user.delete()
  }
}

module.exports = UserController
