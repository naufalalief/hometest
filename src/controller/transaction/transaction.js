const { errorResponse } = require("../../helper/response");
const doTransaction = require("../../services/transaction/doTransaction");

async function transactionController(pool, req, res, next) {
  try {
    const userId = req.user.id;
    const { service_code } = req.body;
    if (!service_code) {
      return errorResponse(res, 400, "Service code wajib diisi");
    }
    const result = await doTransaction(pool, userId, service_code);
    return res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: result,
    });
  } catch (error) {
    if (error.message === "Saldo tidak cukup") {
      return errorResponse(res, 400, error.message);
    }
    if (error.message === "Service tidak ditemukan") {
      return errorResponse(res, 404, error.message);
    }
    next(error);
  }
}
module.exports = transactionController;
