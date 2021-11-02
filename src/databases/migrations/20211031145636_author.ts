import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.withSchema('public').createTable('author', (table: Knex.TableBuilder) => {
		table.increments('id').primary().unique().index()
		table.string('first_name').unique().notNullable()
		table.string('last_name').notNullable()
		table.string('place_of_birth').notNullable()
		table.date('date_of_birth').notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.withSchema('public').dropTable('author')
}
