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
    const data = request.only([
      'name',
      'lastname',
      'birthday',
      'gender',
      'email',
      'password'
    ])

    const user = await User.create(data)

    await user.reload()

    return user
  }

  async update({ request, auth, response }) {
    const currentUser = auth.current.user
    const isAdmin = currentUser.role === 'admin'

    // TODO: verify duplicate email
    const data = isAdmin
      ? request.all()
      : request.only([
          'name',
          'lastname',
          'birthday',
          'gender',
          'email',
          'password'
        ])

    const { id } = request.params
    const user = await User.findOrFail(id)

    if (!isAdmin && user.id !== currentUser.id) {
      return response.status(403).send('Forbidden')
    }

    user.merge(data)
    await user.save()

    return user
  }

  async destroy({ request, auth, response }) {
    const currentUser = auth.current.user
    const isAdmin = currentUser.role === 'admin'

    const { id } = request.params
    const user = await User.findOrFail(id)

    if (!isAdmin && user.id !== currentUser.id) {
      return response.status(403).send('Forbidden')
    }

    await user.delete()
  }

  login({ request, auth }) {
    const { refreshToken, email, password } = request.all()

    if (refreshToken) {
      return auth.generateForRefreshToken(refreshToken)
    }

    return auth.withRefreshToken().attempt(email, password)
  }

  me({ auth }) {
    return auth.getUser()
  }
}

module.exports = UserController
