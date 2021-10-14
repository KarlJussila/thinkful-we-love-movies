
exports.up = function (knex) {
  // return knex.schema.createTable("movies_theaters", (table) => {
  //     table
  //       .foreign("movie_id")
  //       .references("movie_id")
  //       .inTable("movies")
  //       .onDelete("CASCADE");
  //   table.boolean("is_showing");
  //   table.timestamps(true, true);
  // });
  const newTable = knex.raw(`
      CREATE TABLE movies_theaters (
          "theater_id" INTEGER REFERENCES theaters(theater_id),
          "movie_id" INTEGER REFERENCES movies(movie_id),
          "is_showing" boolean,
          "created_at" timestamptz not null default CURRENT_TIMESTAMP,
          "updated_at" timestamptz not null default CURRENT_TIMESTAMP
      );
  `)
  return newTable;
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
