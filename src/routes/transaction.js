const transactionController = require("../controller/transaction/transaction");
const auth = require("../middleware/auth");

function transactionRouter(pool) {
  const router = require("express").Router();
  router.post("/transaction", auth, (req, res, next) =>
    transactionController(pool, req, res, next)
  );
  router.get("/transaction/history", auth, (req, res, next) =>
    getTransactionHistoryController(pool, req, res, next)
  );
  return router;
}

module.exports = {
  transactionRouter,
};
