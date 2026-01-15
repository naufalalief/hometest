const express = require("express");
const auth = require("../middleware/auth");
const getBalanceController = require("../controller/balance/getBalance");
const topUpController = require("../controller/balance/topUp");

function balanceRouter(pool) {
  const router = express.Router();
  router.get("/balance", auth, (req, res, next) =>
    getBalanceController(pool, req, res, next)
  );

  router.post("/topup", auth, (req, res, next) =>
    topUpController(pool, req, res, next)
  );

  return router;
}

module.exports = balanceRouter;
