const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsConfig = cors({ methods: ["PUT", "DELETE"] });

router.route("/:reviewId")
    .put(corsConfig, controller.update)
    .delete(corsConfig, controller.delete)
    .options(corsConfig)
    .all(methodNotAllowed);

module.exports = router;
