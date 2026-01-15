const express = require("express");
const authRouter = require("./auth");
const router = express.Router();
const pool = require("../services/db/config");
const profileRouter = require("./profile");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/", authRouter(pool));
router.use("/", profileRouter(pool));

module.exports = router;
