exports.up = async  knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('occurrences', table => {
        table.string('id', 50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('user_id', 50).references("id").inTable("users").index().onDelete("CASCADE")
        table.text('message').notNullable()
        table.timestamp('created_at', { precision: 6, useTz: true }).defaultTo(knex.fn.now(6)).notNullable()
    })
};

exports.down = async knex => {
    return knex.schema.dropTable('occurrences')
};
