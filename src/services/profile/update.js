async function updateProfile(pool, userId, { first_name, last_name }) {
  await pool.query(
    "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?",
    [first_name, last_name, userId]
  );
  const [rows] = await pool.query(
    "SELECT email, first_name, last_name FROM users WHERE id = ?",
    [userId]
  );
  return rows[0];
}
module.exports = updateProfile;
