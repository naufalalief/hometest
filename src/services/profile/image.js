async function updateProfileImage(pool, userId, imageUrl) {
  await pool.query("UPDATE users SET profile_image = ? WHERE id = ?", [
    imageUrl,
    userId,
  ]);
  const [rows] = await pool.query(
    "SELECT email, first_name, last_name, profile_image FROM users WHERE id = ?",
    [userId]
  );
  return rows[0];
}
module.exports = updateProfileImage;
