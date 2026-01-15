const express = require("express");
const registerController = require("../controller/auth/register");
const loginController = require("../controller/auth/login");

function authRouter(pool) {
  const router = express.Router();
  router.post("/register", (req, res, next) => {
    registerController(pool, req, res, next);
  });

  router.post("/login", (req, res, next) => {
    loginController(pool, req, res, next);
  });
  return router;
}
module.exports = authRouter;
