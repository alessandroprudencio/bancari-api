exports.up = async  knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await knex.raw('SET timezone TO "America/Sao_Paulo"')
    return knex.schema.createTable('reservations', table => {
        table.string('id', 50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('resident_id', 100).references("id").inTable("residents").index().onDelete("CASCADE")
        table.string('place').notNullable()
        table.datetime('date').notNullable()
        table.timestamps(true, true,{ useTz: true, precision: 6 })
    })
}

exports.down = async knex => {
    return knex.schema.dropTable('reservations')
}
