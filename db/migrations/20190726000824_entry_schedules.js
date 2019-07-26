exports.up = async  knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('entry_schedules', table => {
        table.string('id', 50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('name', 50).notNullable()
        table.string('cpf').notNullable()
        table.string('placa_veiculo').notNullable()
        table.text('token')
        table.timestamps(true, true, [{ useTz: true }, { precision: 6 }])
    })
};

exports.down = async knex => {
    return knex.schema.dropTable('entry_schedules')
};
