exports.up = async  knex =>{
    return knex.schema.createTable('realtys', table => {
        table.string('id',50).unique().notNullable().primary().defaultTo(require('uuid/v4')())
        table.string('owner_id',50).references("id").inTable("residents").index().onDelete("CASCADE")
        table.text('address').notNullable()
        table.integer('number_address').notNullable()
        table.timestamp('created_at',{ precision: 6, useTz: true }).defaultTo(knex.fn.now(6)).notNullable()
    })
};

exports.down = async knex => {
    return knex.schema.dropTable('realtys')
};
