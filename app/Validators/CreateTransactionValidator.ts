import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    value: schema.string({ trim: true }),
    date: schema.date({
      format: 'dd/MM/yyyy',
    }),
    type: schema.enum(['income', 'outcome']),
    category: schema.number([rules.exists({ column: 'id', table: 'categories' })]),
  })

  public messages: CustomMessages = {
    required: 'Campo obrigatório',
  }
}
