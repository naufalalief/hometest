const express = require("express");
const profileController = require("../controller/profile/profile");
const auth = require("../middleware/auth");
const updateProfileController = require("../controller/profile/update");
const upload = require("../middleware/upload");
const uploadProfileImageController = require("../controller/profile/image");

function profileRouter(pool) {
  const router = express.Router();
  router.get("/profile", auth, (req, res, next) => {
    profileController(pool, req, res, next);
  });

  router.put("/profile/update", auth, (req, res, next) => {
    updateProfileController(pool, req, res, next);
  });

  router.put(
    "/profile/image",
    auth,
    upload.single("file"),
    (req, res, next) => {
      uploadProfileImageController(pool, req, res, next);
    }
  );
  return router;
}
module.exports = profileRouter;
