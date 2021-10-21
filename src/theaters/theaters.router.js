const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsConfig = cors({ methods: ["GET"] });

router.route("/")
    .get(corsConfig, controller.list)
    .all(methodNotAllowed);

module.exports = router;
