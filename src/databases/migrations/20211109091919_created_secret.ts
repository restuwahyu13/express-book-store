import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createSchema('secret')
    .withSchema('secret')
    .createTable('secret_key', (table: Knex.TableBuilder) => {
      table.increments('id').primary().unique().index()
      table.integer('user_id').references('id').inTable('user').unsigned().nullable().index()
      table.string('access_token').nullable()
      table.datetime('expired_at').nullable()
      table.enum('type', ['login', 'activation', 'reset password']).nullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('secret').dropTable('secret_key').dropSchema('secret')
}
