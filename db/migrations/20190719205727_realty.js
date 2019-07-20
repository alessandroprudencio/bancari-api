exports.up = async  knex =>{
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('realtys', table => {
        table.string('id',50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('owner_id',50).references("id").inTable("residents").index().onDelete("CASCADE").notNullable()
        table.text('address').notNullable();
        table.integer('number_address',50).notNullable();
        table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6));
    })
};

exports.down = async knex => {
    return knex.schema.dropTable('realtys')
};
