exports.up = async  knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('users', table => {
      table.string('id',50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name',50).notNullable();
      table.string('email', 50).unique().notNullable();
      table.string('password',50).notNullable();
      table.string('image',50)
      table.boolean('admin',50).defaultTo(false)
      table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6));
    })
};

exports.down = async knex => {
  return knex.schema.dropTable('users')
};
