
exports.up = function (knex) {
    return knex.schema.createTable('residents', table => {
        table.increments('id').primary()
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('image')
        table.text('address').notNullable();
        table.string('phone').notNullable();
        table.integer('number_address').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('residents')
};
