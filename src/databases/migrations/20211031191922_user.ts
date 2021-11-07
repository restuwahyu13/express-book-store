import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('user', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unique().index()
    table.string('email').notNullable()
    table.text('password').notNullable()
    table.enum('role', ['customer', 'admin']).defaultTo('customer')
    table.boolean('active').defaultTo(false)
    table.boolean('verified').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('user')
}
