const { successResponse, errorResponse } = require("../../helper/response");
const getProfile = require("../../services/profile/getProfile");

const profileController = async (pool, req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await getProfile(pool, userId);
    if (!profile) {
      return errorResponse(res, 404, "Profile not found");
    }
    return successResponse(res, 200, "Profile fetched successfully", profile);
  } catch (error) {
    return next(error);
  }
};

module.exports = profileController;
