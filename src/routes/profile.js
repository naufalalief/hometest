const express = require("express");
const profileController = require("../controller/profile/profile");
const authMiddleware = require("../middleware/authMiddleware");

function profileRouter(pool) {
  const router = express.Router();
  router.get("/profile", authMiddleware, (req, res, next) => {
    profileController(pool, req, res, next);
  });

  return router;
}
module.exports = profileRouter;
