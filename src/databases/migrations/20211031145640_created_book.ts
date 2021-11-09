import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema('public')
    .createTable('book', (table: Knex.TableBuilder) => {
      table.increments('id').primary().unique().index()
      table.string('name').notNullable()
      table.bigInteger('isbn').unique().unsigned().notNullable()
      table.date('release_date').notNullable()
      table.string('publisher').notNullable()
      table.float('price').notNullable()
      table.string('description').nullable()
      table.string('language').notNullable()
      table.integer('page').unsigned().notNullable()
      table.integer('author_id').unsigned().notNullable().references('id').inTable('author').index()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('book_image', (table: Knex.TableBuilder) => {
      table.increments('id').primary().unique().index()
      table.integer('book_id').references('id').inTable('book').unsigned().nullable().index()
      table.string('first_image').nullable()
      table.string('second_image').nullable()
      table.string('third_image').nullable()
      table.string('fourth_image').nullable()
      table.string('fifth_image').nullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('book').dropTable('book_image')
}
