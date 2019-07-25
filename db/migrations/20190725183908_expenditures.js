exports.up = async  knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('expenditures', table => {
        table.string('id', 50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('name', 50).notNullable()
        table.float('value').notNullable()
        table.timestamps(true, true, [{ useTz: true }, { precision: 6 }])
    })
};

exports.down = async knex => {
    return knex.schema.dropTable('expenditures')
};
