const getBalance = require("../../services/balance/getBalance");
const { successResponse } = require("../../helper/response");
async function getBalanceController(pool, req, res, next) {
  try {
    const userId = req.user.id;
    const balance = await getBalance(pool, userId);
    return successResponse(res, 200, "Sukses", { balance });
  } catch (error) {
    next(error);
  }
}

module.exports = getBalanceController;
