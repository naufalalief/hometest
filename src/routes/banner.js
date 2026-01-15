const express = require("express");
const getBannerController = require("../controller/banner/getBanner");

function bannerRouter(pool) {
  const router = express.Router();
  router.get("/banner", (req, res, next) =>
    getBannerController(pool, req, res, next)
  );
  return router;
}

module.exports = bannerRouter;
