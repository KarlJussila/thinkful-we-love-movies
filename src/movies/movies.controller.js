const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next) {
    return { data: await res.locals.movie };
}

async function list(req, res, next) {
    return { data: await service.list() }
}

async function getTheaters(req, res, next) {
    const { movieId } = req.params;
    return { data: service.getTheaters(movieId) }
}

async function getReviews(req, res, next) {
    const { movieId } = req.params;
    return { data: service.getReviews(movieId) }
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list,
    getTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getTheaters)],
    getReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getReviews)]
};
