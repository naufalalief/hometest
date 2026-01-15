const { successResponse } = require("../../helper/response");
const { loginSchema } = require("../../schema/validation/user");
const loginUser = require("../../services/auth/login");
const loginController = async (pool, req, res, next) => {
  try {
    const schema = loginSchema;
    const parsedData = await schema.parseAsync(req.body);
    const result = await loginUser(pool, parsedData);
    return successResponse(res, result.status, result.message, result.data);
  } catch (error) {
    return next(error);
  }
};

module.exports = loginController;
