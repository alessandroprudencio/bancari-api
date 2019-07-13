// const uuidv4 = require('uuid/v4')
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('email').unique().notNullable();
    table.string('password')
    table.string('image')
    table.boolean('admin').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('users')
};
