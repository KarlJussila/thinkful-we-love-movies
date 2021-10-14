
exports.up = function (knex) {
  // return knex.schema.createTable("movies", (table) => {
  //   table.increments("movie_id").primary();
  //   table.string("title");
  //   table.integer("runtime_in_minutes");
  //   table.string("rating");
  //   table.text("description");
  //   table.string("image_url");
  //   table.timestamps(true, true);
  // });
  const newTable = knex.raw(`
      create table "movies" (
          "movie_id" serial primary key,
          "title" varchar(255),
          "runtime_in_minutes" integer,
          "rating" varchar(255),
          "description" text,
          "image_url" varchar(255),
          "created_at" timestamptz not null default CURRENT_TIMESTAMP,
          "updated_at" timestamptz not null default CURRENT_TIMESTAMP
      )
  `)
  return newTable;
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};
