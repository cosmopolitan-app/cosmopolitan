'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run() {
    await User.create({
      name: 'Admin',
      email: 'admin@example.org',
      password: '123456',
      role: 'admin'
    })

    await User.create({
      name: 'Manager',
      email: 'manager@example.org',
      password: '123456',
      role: 'event-manager'
    })

    await Promise.all([
      Factory.model('App/Models/User').createMany(100),
      Factory.model('App/Models/Event').createMany(100)
    ])
  }
}

module.exports = UserSeeder
