// src/controller/bannerController.js
const { successResponse } = require("../../helper/response");
const getBannerList = require("../../services/banner/getBanner");

const getBannerController = async (pool, req, res, next) => {
  try {
    const banners = await getBannerList(pool);
    return successResponse(res, 200, "Sukses", { list: banners });
  } catch (err) {
    return next(err);
  }
};

module.exports = getBannerController;
