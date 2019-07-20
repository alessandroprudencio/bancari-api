exports.up = async knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    return knex.schema.createTable('residents', table => {
        table.string('id',50).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('name',50).notNullable()
        table.string('email',50).unique().notNullable()
        table.string('image',50)
        table.text('address').notNullable()
        table.string('phone',50).notNullable()
        table.integer('number_address',50).notNullable()
        table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6)).notNullable()
    })
}

exports.down = async knex =>{
    return knex.schema.dropTable('residents')
}
