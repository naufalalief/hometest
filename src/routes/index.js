const express = require("express");
const authRouter = require("./auth");
const router = express.Router();
const pool = require("../services/db/config");
const profileRouter = require("./profile");
const bannerRouter = require("./banner");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/", authRouter(pool));
router.use("/", profileRouter(pool));
router.use("/", bannerRouter(pool));
module.exports = router;
