const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function loginUser(pool, { email, password }) {
  const [rows] = await pool.query(
    "SELECT id, email, first_name, last_name, password FROM users WHERE email = ?",
    [email]
  );

  const user = rows[0];
  if (!user) {
    const error = new Error("Email tidak valid");
    error.status = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Kata sandi tidak valid");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );
  return {
    status: 200,
    message: "Login berhasil",
    data: {
      token,
    },
  };
}

module.exports = loginUser;
