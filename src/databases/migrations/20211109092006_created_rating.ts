import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('rating', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unique().index()
    table.string('rating').notNullable()
    table.string('description').nullable()
    table.integer('user_id').references('id').inTable('user').unsigned().notNullable().index()
    table.integer('book_id').references('id').inTable('book').unsigned().notNullable().index()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('rating')
}
