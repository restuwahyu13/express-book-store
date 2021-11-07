import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('order', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unique().index()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.integer('phone').unsigned().notNullable()
    table.text('address').notNullable()
    table.string('state').notNullable()
    table.string('city').notNullable()
    table.string('country').notNullable()
    table.bigInteger('postcode').unsigned().notNullable()
    table.integer('user_id').unsigned().notNullable().references('id').inTable('user').index()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('order')
}
