import View from '@ioc:Adonis/Core/View'
import Category from 'App/Models/Category'

View.global('loadCategories', async function () {
  return await Category.query().orderBy('id', 'asc')
})

View.global('loadCurrencies', async function () {
  return ['USD', 'EUR', 'BRL']
})
