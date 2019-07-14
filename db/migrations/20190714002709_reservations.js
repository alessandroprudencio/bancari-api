
exports.up = function(knex) {
    return knex.schema.createTable('reservations', table => {
        table.increments('id').primary()
        table.integer('resident_id').references("id").inTable("residents").index().onDelete("CASCADE")
        table.string('local').notNullable();
        table.datetime('date').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reservations')
};
