import I18n from '@ioc:Adonis/Addons/I18n'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ auth, response, view }) => {
  if (auth.isLoggedIn) {
    return response.redirect('/dashboard')
  }

  return view.render('pages/home')
})

Route.get('/google/redirect', 'AuthController.redirect')
Route.get('/google/callback', 'AuthController.callback')
Route.post('/logout', 'AuthController.logout')

Route.get('/dashboard', 'TransactionsController.index').middleware('auth')
Route.on('/cadastrar').render('pages/register').middleware('auth')
Route.get('/resumo', 'TransactionsController.resume').middleware('auth')

Route.group(() => {
  Route.post('/', 'TransactionsController.store')
  Route.delete('/:id', 'TransactionsController.delete')
})
  .prefix('/transactions')
  .middleware('auth')

Route.post('language/:locale', async ({ session, response, params }) => {
  /**
   * Only update locale when it is part of the supportedLocales
   */
  if (I18n.supportedLocales().includes(params.locale)) {
    session.put('locale', params.locale)
  }

  console.log(params.locale)

  response.redirect().back()
}).as('language.update')
