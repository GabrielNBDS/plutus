import Route from '@ioc:Adonis/Core/Route'
import RenderPage from '../app/Utils/RenderPage'

Route.get('/', RenderPage('pages/home'))

Route.get('/google/redirect', 'AuthController.redirect')
Route.get('/google/callback', 'AuthController.callback')
Route.post('/logout', 'AuthController.logout')

Route.get('/dashboard', RenderPage('pages/dashboard')).middleware('auth')

Route.get('/cadastrar', RenderPage('pages/register')).middleware('auth')

Route.group(() => {
  Route.post('/', 'TransactionsController.store')
  Route.delete('/:id', 'TransactionsController.delete')
})
  .prefix('/transactions')
  .middleware('auth')
