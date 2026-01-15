const { errorResponse, successResponse } = require("../../helper/response");
const updateProfileImage = require("../../services/profile/image");

const uploadProfileImageController = async (pool, req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, 400, "File tidak ditemukan");
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return errorResponse(res, 400, "Format Image tidak sesuai");
    }
    const userId = req.user.id;
    const imageUrl = `/uploads/${userId}/${req.file.filename}`;
    const updated = await updateProfileImage(pool, userId, imageUrl);
    if (!updated) return errorResponse(res, 404, "User tidak ditemukan");
    return successResponse(res, 200, "Update Profile Image berhasil", updated);
  } catch (err) {
    return next(err);
  }
};
module.exports = uploadProfileImageController;
