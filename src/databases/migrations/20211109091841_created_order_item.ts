import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('order_item', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unique().index()
    table.integer('order_id').references('id').inTable('order').unsigned().notNullable().index()
    table.integer('book_id').references('id').inTable('book').unsigned().notNullable().index()
    table.enum('order_status', ['pending', 'process', 'sending', 'done']).notNullable()
    table.enum('payment_type', ['credit_card', 'bank_transfer', 'ovo', 'dana', 'gopay', 'grabpay', 'shopeepay']).notNullable()
    table.enum('payment_status', ['paid', 'not paid']).notNullable()
    table.integer('total_order').unsigned().notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('order_item')
}
