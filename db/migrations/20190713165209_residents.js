
exports.up = async knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('residents', table => {
        table.string('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('image')
        table.text('address').notNullable();
        table.string('phone').notNullable();
        table.integer('number_address').notNullable();
        table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6));
    })
};

exports.down = async knex =>{
    return knex.schema.dropTable('residents')
};
