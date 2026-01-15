const express = require("express");
const authRouter = require("./auth");
const router = express.Router();
const pool = require("../services/db/config");
const profileRouter = require("./profile");
const bannerRouter = require("./banner");
const layananRouter = require("./layanan");
const balanceRouter = require("./balance");
const { transactionRouter } = require("./transaction");

router.get("/", (req, res) => {
  res.redirect("/api-docs");
});

router.use("/", authRouter(pool));
router.use("/", profileRouter(pool));
router.use("/", bannerRouter(pool));
router.use("/", layananRouter(pool));
router.use("/", balanceRouter(pool));
router.use("/", transactionRouter(pool));
module.exports = router;
