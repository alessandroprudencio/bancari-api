// const uuidv4 = require('uuid/v4')
exports.up = async  knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('users', table => {
      table.string('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('image').notNullable();
      table.boolean('admin').defaultTo(false)
      table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6));
    })
};

exports.down = async knex => {
  return knex.schema.dropTable('users')
};
