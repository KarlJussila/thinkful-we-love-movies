
exports.up = function (knex) {
  // return knex.schema.createTable("theaters", (table) => {
  //   table.increments("theater_id").primary();
  //   table.string("name");
  //   table.string("address_line_1");
  //   table.string("address_line_2");
  //   table.string("city");
  //   table.string("state");
  //   table.string("zip");
  //   table.timestamps(true, true);
  // });
  const newTable = knex.raw(`
      create table "theaters" (
          "theater_id" serial primary key,
          "name" varchar(255),
          "address_line_1" varchar(255),
          "address_line_2" varchar(255),
          "city" varchar(255),
          "state" varchar(255),
          "zip" varchar(255),
          "created_at" timestamptz not null default CURRENT_TIMESTAMP,
          "updated_at" timestamptz not null default CURRENT_TIMESTAMP
      )
  `)
  return newTable;
};

exports.down = function (knex) {
  return knex.schema.dropTable("theaters");
};
