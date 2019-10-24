'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .middleware(new Map([[['users.update', 'users.destroy'], ['auth']]]))

  Route.resource('events', 'EventController')
    .apiOnly()
    .middleware(
      new Map([
        [['events.store', 'events.update', 'events.destroy'], ['auth', 'staff']]
      ])
    )

  Route.resource('sessions', 'SessionController')
    .apiOnly()
    .middleware(
      new Map([
        [
          ['sessions.store', 'sessions.update', 'sessions.destroy'],
          ['auth', 'staff']
        ]
      ])
    )

  Route.resource('comments', 'CommentController')
    .apiOnly()
    .middleware(
      new Map([
        [['comments.store', 'comments.update', 'comments.destroy'], ['auth']]
      ])
    )

  Route.get('cities', 'CityController.index').middleware(['staff'])

  Route.get('me', 'UserController.me').middleware(['auth'])
  Route.post('login', 'UserController.login')
})
  .formats(['json'])
  .prefix('api')

Route.any('*', 'NuxtController.render')
