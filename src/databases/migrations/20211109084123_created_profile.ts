import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('profile', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unique().index()
    table.string('user_id').references('id').inTable('user').onDelete('CASCADE').unsigned().notNullable()
    table.string('firstname').nullable()
    table.string('lastname').nullable()
    table.string('email').nullable()
    table.integer('phone').unsigned().nullable()
    table.string('place_of_birth').nullable()
    table.date('date_of_birth').nullable()
    table.string('address').nullable()
    table.string('state').nullable()
    table.string('city').nullable()
    table.string('country').nullable()
    table.integer('postcode').unsigned().nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('profile')
}
