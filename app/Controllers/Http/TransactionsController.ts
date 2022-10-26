import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Transaction from 'App/Models/Transaction'
import groupBy from 'App/Utils/GroupBy'
import CreateTransactionValidator from 'App/Validators/CreateTransactionValidator'

export default class TransactionsController {
  public async index({ auth, view, request }: HttpContextContract) {
    const user = auth.user!

    const { month: date } = request.qs()

    let year: number
    let month: number

    if (date) {
      const [requestYear, requestMonth] = date?.split('-')
      month = requestMonth
      year = requestYear
    } else {
      const today = new Date()
      month = today.getMonth() + 1
      year = today.getFullYear()
    }

    const transactions = await Transaction.query()
      .preload('category')
      .where('year', year)
      .andWhere('month', month)
      .andWhere('user_id', user.id)

    const totalIncome = transactions
      .filter((item) => item.type === 'income')
      .map((item) => item.value)
      .reduce((a, b) => a + b, 0)

    const totalOutcome =
      transactions
        .filter((item) => item.type === 'outcome')
        .map((item) => item.value)
        .reduce((a, b) => a + b, 0) * -1

    const data = {
      transactions,
      month: ('0' + month).slice(-2),
      year: year,
      totalIncome,
      totalOutcome,
    }

    return view.render('pages/dashboard', data)
  }

  public async resume({ auth, view, request }: HttpContextContract) {
    const user = auth.user!

    const { month: date } = request.qs()

    let year: number
    let month: number

    if (date) {
      const [requestYear, requestMonth] = date?.split('-')
      month = requestMonth
      year = requestYear
    } else {
      const today = new Date()
      month = today.getMonth() + 1
      year = today.getFullYear()
    }

    const transactions = await Transaction.query()
      .preload('category')
      .where('year', year)
      .andWhere('month', month)
      .andWhere('user_id', user.id)

    const grouped: { category: string; total: number }[] = []
    const groupedObj = groupBy(transactions, 'categoryId')
    for (let key in groupedObj) {
      grouped.push({
        category: groupedObj[key][0].category.name,
        total: groupedObj[key].map((item) => item.value).reduce((a, b) => a + b, 0),
      })
    }

    const totalIncome = transactions
      .filter((item) => item.type === 'income')
      .map((item) => item.value)
      .reduce((a, b) => a + b, 0)

    const totalOutcome =
      transactions
        .filter((item) => item.type === 'outcome')
        .map((item) => item.value)
        .reduce((a, b) => a + b, 0) * -1

    const data = {
      month: ('0' + month).slice(-2),
      year: year,
      grouped: grouped.sort((a, b) => Math.abs(a.total) - Math.abs(b.total)).reverse(),
      difference: totalIncome - totalOutcome,
    }

    return view.render('pages/resume', data)
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    const user = auth.user!
    const { name, value, date, type, category } = await request.validate(CreateTransactionValidator)

    try {
      const trx = await Database.transaction()

      const formattedValue =
        Number(
          Number(value.replaceAll('.', '').replace(',', '.')).toFixed(2).toString().replace('.', '')
        ) * (type === 'income' ? 1 : -1)

      await trx.table('transactions').insert({
        name,
        value: formattedValue,
        day: date.day,
        month: date.month,
        year: date.year,
        type: type as 'income' | 'outcome',
        category_id: category,
        user_id: user.id,
      })

      await trx
        .from('users')
        .where('id', user.id)
        .update({
          total: user.total + formattedValue,
        })

      await trx.commit()

      session.flash('toast', [{ type: 'success', message: 'Transação cadastrada!' }])

      return response.redirect('/dashboard')
    } catch (error) {
      console.log(error)

      session.flash('toast', [{ type: 'error', message: 'Ocorreu um erro, tente novamente.' }])

      return response.redirect().back()
    }
  }

  public async delete({ auth, request, response, session }: HttpContextContract) {
    const user = auth.user!

    const { id } = request.params()

    const transaction = await Transaction.findOrFail(id)

    if (transaction.userId !== user.id) {
      return response.unauthorized()
    }

    const formattedValue = transaction.value * -1

    const trx = await Database.transaction()

    await trx.from('transactions').where('id', id).delete()

    await trx
      .from('users')
      .where('id', user.id)
      .update({
        total: user.total + formattedValue,
      })

    try {
      await trx.commit()

      session.flash('toast', [{ type: 'success', message: 'Transação removida!' }])
    } catch (error) {
      console.log(error)

      session.flash('toast', [{ type: 'error', message: 'Ocorreu um erro, tente novamente.' }])
    } finally {
      response.redirect().back()
    }
  }
}
