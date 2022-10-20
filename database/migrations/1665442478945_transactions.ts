import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('value').notNullable()
      table.integer('day').notNullable()
      table.integer('month').notNullable()
      table.integer('year').notNullable()
      table.enum('type', ['income', 'outcome']).notNullable()

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
