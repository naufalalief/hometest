const express = require("express");
const authRouter = require("./auth");
const router = express.Router();
const pool = require("../services/db/config");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/", authRouter(pool));

module.exports = router;
