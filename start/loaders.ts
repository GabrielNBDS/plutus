import View from '@ioc:Adonis/Core/View'
import Category from '../app/Models/Category'
import Transaction from '../app/Models/Transaction'

View.global('loadCategories', async function () {
  return await Category.query().orderBy('id', 'asc')
})

View.global('loadTransactions', async function (userId: string) {
  const today = new Date()
  const transactions = await Transaction.query()
    .preload('category')
    .where('year', today.getFullYear())
    .andWhere('month', today.getMonth() + 1)
    .andWhere('user_id', userId)

  const totalIncome = transactions
    .filter((item) => item.type === 'income')
    .map((item) => item.value)
    .reduce((a, b) => a + b, 0)

  const totalOutcome =
    transactions
      .filter((item) => item.type === 'outcome')
      .map((item) => item.value)
      .reduce((a, b) => a + b, 0) * -1

  return { transactions, totalIncome, totalOutcome }
})
