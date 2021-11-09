import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('notification', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unique().index()
    table.integer('user_id').references('id').inTable('user').unsigned().notNullable().index()
    table.integer('book_id').references('id').inTable('book').unsigned().notNullable().index()
    table.integer('order_item_id').references('id').inTable('order_item').unsigned().notNullable().index()
    table.string('message').notNullable()
    table.string('token').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('notification')
}
