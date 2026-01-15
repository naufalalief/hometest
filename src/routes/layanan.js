const express = require("express");
const auth = require("../middleware/auth");
const getServiceControlelr = require("../controller/layanan/getService");

function layananRouter(pool) {
  const router = express.Router();
  router.get("/services", auth, (req, res, next) =>
    getServiceControlelr(pool, req, res, next)
  );
  return router;
}

module.exports = layananRouter;
