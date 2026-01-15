const { successResponse } = require("../../helper/response");
const getAllServices = require("../../services/layanan/getLayanan");

const getServiceControlelr = async (pool, req, res, next) => {
  try {
    const services = await getAllServices(pool);
    return successResponse(res, 200, "Layanan berhasil diambil", services);
  } catch (error) {
    return next(error);
  }
};
module.exports = getServiceControlelr;
