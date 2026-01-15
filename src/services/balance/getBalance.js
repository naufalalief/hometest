async function getBalance(pool, userId) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT balance FROM balance WHERE user_id = ?",
      [userId]
    );
    return rows.length ? rows[0].balance : 0;
  } finally {
    conn.release();
  }
}

module.exports = getBalance;
