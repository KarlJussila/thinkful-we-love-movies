const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

async function update(updatedReview) {
    const updatedReviewResponse = await knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*");

        return updatedReviewResponse[0];
}

function destroy(reviewId) {
    return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
    update,
    delete: destroy,
};
