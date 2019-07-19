
exports.up = async  knex =>{
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('reservations', table => {
        table.string('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('resident_id').references("id").inTable("residents").index().onDelete("CASCADE")
        table.string('place').notNullable();
        table.datetime('date').notNullable()
        table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6));
    })
};

exports.down = async knex => {
    return knex.schema.dropTable('reservations')
};
