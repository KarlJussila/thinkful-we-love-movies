const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);
  if (review) {
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function update(req, res) {
  res.json({ data: await service.update(req.body.data) });
}

function destroy(req, res, next) {
  const { postId } = req.params;
  service.delete(postId)
  .then(res.sendStatus(204))
  .catch(next);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
