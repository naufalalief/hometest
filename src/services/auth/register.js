require("dotenv").config();
const bcrypt = require("bcrypt");

async function registerUser(pool, { email, first_name, last_name, password }) {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await pool.query(
    "INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)",
    [email, first_name, last_name, hashedPassword]
  );

  return {
    status: 201,
    message: "User registered successfully",
    data: { email, first_name, last_name },
  };
}
module.exports = { registerUser };
