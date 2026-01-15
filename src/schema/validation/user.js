const { z } = require("zod");

const baseFields = {
  email: z.email(),
  first_name: z
    .string()
    .min(5, { error: "terlalu pendek, minimal 5 karakter" }),
  last_name: z.string().min(5, { error: "terlalu pendek, minimal 5 karakter" }),
  password: z.string().min(8, { error: "terlalu pendek, minimal 8 karakter" }),
};

const registerSchema = pool =>
  z.object({
    ...baseFields,
    email: z.email().refine(async email => {
      const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [
        email,
      ]);
      return rows.length === 0;
    }, "Email sudah terdaftar"),
  });

const loginSchema = z.object({
  email: baseFields.email,
  password: baseFields.password,
});

const updateSchema = z.object({
  first_name: baseFields.first_name,
  last_name: baseFields.last_name,
});

module.exports = { registerSchema, loginSchema, updateSchema };
