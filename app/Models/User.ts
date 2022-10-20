import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Transaction from './Transaction'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public avatar: string

  @column()
  public total: number

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>

  @column({ serializeAs: null })
  public accessToken: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
