exports.up = async  knex =>{
    return knex.schema.createTable('reservations', table => {
        table.string('id',50).unique().notNullable().primary().defaultTo(require('uuid/v4')())
        table.string('resident_id',100).references("id").inTable("residents").index().onDelete("CASCADE")
        table.string('place').notNullable()
        table.datetime('date').notNullable()
        table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6)).notNullable()
    })
}

exports.down = async knex => {
    return knex.schema.dropTable('reservations')
}
