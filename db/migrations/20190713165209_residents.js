exports.up = async knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await knex.raw('SET timezone TO "America/Sao_Paulo"')
    return knex.schema.createTable('residents', table => {
        table.string('id', 50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('name', 100).notNullable()
        table.string('email', 100).unique().notNullable()
        table.string('image', 100)
        table.text('address').notNullable()
        table.string('phone', 100).notNullable()
        table.integer('number_address').notNullable()
        table.timestamps(true, true,{ useTz: true, precision: 6 })
    })
}

exports.down = async knex => {
    return knex.schema.dropTable('residents')
}
