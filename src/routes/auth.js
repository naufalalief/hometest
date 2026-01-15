const express = require("express");
const registerController = require("../controller/auth/register");

function authRouter(pool) {
  const router = express.Router();
  router.post("/register", (req, res, next) => {
    registerController(pool, req, res, next);
  });
  return router;
}
module.exports = authRouter;
