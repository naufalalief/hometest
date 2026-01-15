const fs = require("node:fs");
const { successResponse, errorResponse } = require("../../helper/response");
const updateProfile = require("../../services/profile/update");
const { updateSchema } = require("../../schema/validation/user");

const updateProfileController = async (pool, req, res, next) => {
  try {
    const userId = req.user.id;
    const parseResult = updateSchema.parse(req.body);
    const updated = await updateProfile(pool, userId, parseResult);
    if (!updated) return errorResponse(res, 404, "User tidak ditemukan");
    return successResponse(res, 200, "Update Profile berhasil", {
      first_name: updated.first_name,
      last_name: updated.last_name,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = updateProfileController;
