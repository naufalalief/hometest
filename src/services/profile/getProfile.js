async function getProfile(pool, userId) {
  const [rows] = await pool.query(
    "SELECT email, first_name, last_name, profile_image, created_at FROM users WHERE id = ?",
    [userId]
  );
  return rows[0];
}
module.exports = getProfile;
