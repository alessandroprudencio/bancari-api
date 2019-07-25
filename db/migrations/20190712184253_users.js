exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('users', table => {
    table.string('id', 50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name', 100).notNullable()
    table.string('email', 100).unique().notNullable()
    table.string('password', 100).notNullable()
    table.string('image', 100)
    table.boolean('admin').defaultTo(false)
    table.boolean('morador').defaultTo(false)
    table.boolean('sindico').defaultTo(false)
    table.timestamp('created_at', { precision: 6, useTz: true }).defaultTo(knex.fn.now(6)).notNullable()
    table.timestamp('update_at', { precision: 6, useTz: true }).defaultTo(knex.fn.now(6))
  })
}

exports.down = async knex => {
  return knex.schema.dropTable('users')
}
