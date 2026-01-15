const getTransactionHistory = require("../../services/transaction/history");

async function getTransactionHistoryController(pool, req, res, next) {
  try {
    const userId = req.user.id;
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getTransactionHistory(pool, userId, offset, limit);
    return res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset,
        limit,
        records: result,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = getTransactionHistoryController;
