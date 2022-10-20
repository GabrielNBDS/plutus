import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public value: number

  @column()
  public day: number

  @column()
  public month: number

  @column()
  public year: number

  @column()
  public type: 'income' | 'outcome'

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
