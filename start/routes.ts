import Route from '@ioc:Adonis/Core/Route'
import RenderPage from 'App/Utils/RenderPage'

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

Route.get('/cadastrar', RenderPage('pages/register')).middleware('auth')

Route.group(() => {
  Route.post('/', 'TransactionsController.store')
  Route.delete('/:id', 'TransactionsController.delete')
})
  .prefix('/transactions')
  .middleware('auth')
