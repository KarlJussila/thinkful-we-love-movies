const knex = require("../db/connection");

async function list() {
    const data = await knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("*");
    const theaters = new Map();
    data.forEach((entry) => {
        if (theaters.has(entry.theater_id)) {
            theaters.get(entry.theater_id).movies.push({
                "movie_id": entry.movie_id,
                "title": entry.title,
                "runtime_in_minutes": entry.runtime_in_minutes,
                "rating": entry.rating,
                "description": entry.description,
                "image_url": entry.image_url,
                "is_showing": entry.is_showing
            })
        } else {
            const newTheater = {
                "theater_id": entry.theater_id,
                "name": entry.name,
                "address_line_1": entry.address_line_1,
                "address_line_2": entry.address_line_2,
                "city": entry.city,
                "state": entry.state,
                "zip": entry.zip,
                "movies": [{
                    "movie_id": entry.movie_id,
                    "title": entry.title,
                    "runtime_in_minutes": entry.runtime_in_minutes,
                    "rating": entry.rating,
                    "description": entry.description,
                    "image_url": entry.image_url,
                    "is_showing": entry.is_showing
                }]
            };
            theaters.set(entry.theater_id, newTheater);
        }
    });
    const result = Array.from(await theaters.values());
    // console.log(result);
    return result;
}

module.exports = {
  list,
};
