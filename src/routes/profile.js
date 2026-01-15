const express = require("express");
const profileController = require("../controller/profile/profile");
const authMiddleware = require("../middleware/authMiddleware");
const updateProfileController = require("../controller/profile/update");

function profileRouter(pool) {
  const router = express.Router();
  router.get("/profile", authMiddleware, (req, res, next) => {
    profileController(pool, req, res, next);
  });

  router.put("/profile/update", authMiddleware, (req, res, next) => {
    updateProfileController(pool, req, res, next);
  });
  return router;
}
module.exports = profileRouter;
