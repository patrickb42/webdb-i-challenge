
exports.up = (knex, Promise) => {
  return knex.schema.createTable('accounts', (tbl) => {
    tbl.increments();
    tbl.string('name')
      .notNullable()
      .unique();
    tbl.decimal('budget')
      .notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('accounts');
};
