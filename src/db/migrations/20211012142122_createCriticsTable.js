
exports.up = function (knex) {
    // const newTable = knex.schema.createTable("critics", (table) => {
    //     table.increments("critic_id").primary();
    //     table.string("preferred_name");
    //     table.string("surname");
    //     table.string("organization_name");
    //     table.timestamps(true, true);
    // }).then(console.log);
    const newTable = knex.raw(`
        create table "critics" (
            "critic_id" serial primary key,
            "preferred_name" varchar(255),
            "surname" varchar(255),
            "organization_name" varchar(255),
            "created_at" timestamptz not null default CURRENT_TIMESTAMP,
            "updated_at" timestamptz not null default CURRENT_TIMESTAMP
        )
    `)
    return newTable;
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
