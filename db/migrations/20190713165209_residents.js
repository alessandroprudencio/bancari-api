
exports.up = function(knex) {
    return knex.schema.createTable('residents', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('email').unique().notNullable();
        table.string('image')
        table.text('address')
        table.string('phone')
        table.integer('number_address')
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('residents')
};
