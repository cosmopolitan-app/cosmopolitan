'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Staff {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    const currentUser = await auth.getUser()
    if (!['admin', 'event-manager'].includes(currentUser.role)) {
      return response.status(403).send({
        message: 'Forbidden'
      })
    }

    await next()
  }
}

module.exports = Staff
