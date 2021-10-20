const knex = require("../db/connection");

async function read(movieId) {
    const data = await knex("movies").select(
        "movie_id as id",
        "title",
        "runtime_in_minutes",
        "rating",
        "description",
        "image_url"
    ).where({ movie_id: movieId }).first();
    console.log(data);
    return data;
}

async function list(req, res) {
    if (req.query.is_showing === "true") {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .select(
                "m.movie_id as id",
                "m.title",
                "m.runtime_in_minutes",
                "m.rating",
                "m.description",
                "m.image_url"
            )
            .where({ is_showing: true });
    }
    const data = await knex("movies").select(
        "movie_id as id",
        "title",
        "runtime_in_minutes",
        "rating",
        "description",
        "image_url"
    );
    return data;
}

function getTheaters(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.movie_id", "mt.is_showing")
        .where({ "is_showing": true, "m.movie_id": movieId });
}

async function getReviews(movieId) {
    const reviews = await knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select(
            "r.*",
            "r.created_at as review_created_at",
            "r.updated_at as review_updated_at",
            "c.created_at as critic_created_at",
            "c.updated_at as critic_updated_at",
            "c.*"
        )
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
            organization_name,
            review_created_at,
            review_updated_at,
            critic_created_at,
            critic_updated_at
        } = review;

        return {
            review_id,
            content,
            score,
            critic_id,
            movie_id,
            created_at: review_created_at,
            updated_at: review_updated_at,
            critic: {
                critic_id,
                preferred_name,
                surname,
                organization_name,
                created_at: critic_created_at,
                updated_at: critic_updated_at
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
