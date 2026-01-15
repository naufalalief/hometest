const { successResponse } = require("../../helper/response");
const topupBalance = require("../../services/balance/topUp");

async function topUpController(pool, req, res, next) {
  try {
    const userId = req.user.id;
    const { top_up_amount } = req.body;
    if (!top_up_amount || top_up_amount <= 0) {
      return res.status(400).json({ error: "Invalid top-up amount" });
    }
    const balance = await topupBalance(pool, userId, top_up_amount);
    return successResponse(res, 200, "Top-up successful", { balance });
  } catch (error) {
    next(error);
  }
}
module.exports = topUpController;
