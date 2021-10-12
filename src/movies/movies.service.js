const knex = require("../db/connection");

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function list() {
    if (req.query.is_showing === "true") {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .select("m.*")
            .where({ is_showing: true });
    }
    return knex("movies").select("*");
}

function getTheaters(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "movie_id")
        .where({ is_showing: true });
}

async function getReviews(movieId) {
    const reviews = await knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*");

    return reviews.map((review) => {
        const {
            review_id,
            content,
            score,
            critic_id,
            movie_id,
            preferred_name,
            surname,
            organization_name
        } = review;

        return {
            review_id,
            content,
            score,
            critic_id,
            movie_id,
            critic: {
                preferred_name,
                surname,
                organization_name
            }
        };
    });
}

module.exports = {
    read,
    list,
    getTheaters,
    getReviews
};
