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

const cities = [
  3405863,
  3405870,
  3405924,
  3405940,
  3405954,
  3406160,
  3406196,
  3406263,
  3406318,
  3406429,
  3406442,
  3406545,
  3406910,
  3406961,
  3406996,
  3407194,
  3407216,
  3407243,
  3407258,
  3407327,
  3407357
]

Factory.blueprint('App/Models/Event', (faker) => {
  return {
    open: faker.bool(),
    title: faker.sentence(),
    description: faker.sentence(),
    location: faker.address(),
    tags: faker.n(faker.word, 5),
    start: faker.date(),
    city_id: faker.pickone(cities)
  }
})

Factory.blueprint('App/Models/Session', (faker) => {
  return {
    event_id: faker.integer({ min: 1, max: 100 }),
    title: faker.sentence(),
    description: faker.sentence(),
    type: faker.pickone(['talk', 'workshop', 'tutorial'])
  }
})
