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
    res.json({ data: await res.locals.movie });
}

async function list(req, res, next) {
    res.json({ data: await service.list(req, res) });
}

async function getTheaters(req, res, next) {
    const { movieId } = req.params;
    const data = await service.getTheaters(movieId);
    console.log(data);
    res.json({ data });
}

async function getReviews(req, res, next) {
    const { movieId } = req.params;
    res.json({ data: await service.getReviews(movieId) });
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list,
    getTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getTheaters)],
    getReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getReviews)]
};
