'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  const random = Math.random()
  const role =
    random > 0.7 ? 'admin' : random > 0.5 ? 'event-manager' : 'member'

  return {
    email: faker.email(),
    name: faker.name(),
    password: faker.sentence(),
    role
  }
})
