
exports.up = function(knex) {
    return knex.schema.createTable('residents', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('email').unique().notNullable();
        table.string('image')
        table.text('endereco')
        table.string('telefone')
        table.integer('numero')
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('residents')
};
