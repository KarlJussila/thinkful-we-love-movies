const knex = require("../db/connection");

async function read(movieId) {
    const data = await knex("movies").select("*").where({ movie_id: movieId }).first();
    console.log(data);
    return data;
}

async function list(req, res) {
    if (req.query.is_showing === "true") {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .select("m.*")
            .where({ is_showing: true });
    }
    const data = await knex("movies").select("*");
    return data;
}

function getTheaters(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.movie_id")
        .where({ "is_showing": true, "m.movie_id": movieId });
}

async function getReviews(movieId) {
    const reviews = await knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*")
        .where({"r.movie_id": movieId});

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
