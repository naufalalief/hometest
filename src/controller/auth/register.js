const { successResponse } = require("../../helper/response");
const { registerSchema } = require("../../schema/validation/user");
const { registerUser } = require("../../services/auth/register");

const registerController = async (pool, req, res, next) => {
  try {
    const schema = registerSchema(pool);
    const parsedData = await schema.parseAsync(req.body);
    const result = await registerUser(pool, parsedData);
    return successResponse(res, result.status, result.message, result.data);
  } catch (error) {
    return next(error);
  }
};
module.exports = registerController;
