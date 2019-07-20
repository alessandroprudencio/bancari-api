exports.up = async knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    return knex.schema.createTable('residents', table => {
        table.string('id',100).unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('name',100).notNullable()
        table.string('email',100).unique().notNullable()
        table.string('image',100)
        table.text('address').notNullable()
        table.string('phone',100).notNullable()
        table.integer('number_address').notNullable()
        table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6)).notNullable()
    })
}

exports.down = async knex =>{
    return knex.schema.dropTable('residents')
}
