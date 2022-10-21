import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Transaction from 'App/Models/Transaction'
import CreateTransactionValidator from 'App/Validators/CreateTransactionValidator'

export default class TransactionsController {
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

    console.log(transaction.type)
    console.log(transaction.value)
    console.log(formattedValue)

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
