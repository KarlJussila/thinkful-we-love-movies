
exports.up = function (knex) {
  // return knex.schema.createTable("reviews", (table) => {
  //   table.increments("review_id").primary();
  //   table.text("content");
  //   table.integer("score");
  //   table
  //     .foreign("critic_id")
  //     .references("critic_id")
  //     .inTable("critics")
  //     .onDelete("CASCADE");
  //   table
  //     .foreign("movie_id")
  //     .references("movie_id")
  //     .inTable("movies")
  //     .onDelete("CASCADE");
  //   table.timestamps(true, true);
  // });
  const newTable = knex.raw(`
      create table "reviews" (
          "review_id" serial primary key,
          "content" text,
          "score" integer,
          "critic_id" INTEGER REFERENCES critics(critic_id),
          "movie_id" INTEGER REFERENCES movies(movie_id),
          "created_at" timestamptz not null default CURRENT_TIMESTAMP,
          "updated_at" timestamptz not null default CURRENT_TIMESTAMP
      )
  `)
  return newTable;
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
