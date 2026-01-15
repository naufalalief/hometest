const express = require("express");
const auth = require("../middleware/auth");
const getBalanceController = require("../controller/balance/getBalance");

function balanceRouter(pool) {
  const router = express.Router();
  router.get("/balance", auth, (req, res, next) =>
    getBalanceController(pool, req, res, next)
  );
  return router;
}

module.exports = balanceRouter;
