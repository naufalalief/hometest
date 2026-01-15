async function topupBalance(pool, userId, amount) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      `INSERT INTO balance (user_id, balance) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE balance = balance + VALUES(balance)`,
      [userId, amount]
    );
    await conn.query(
      `INSERT INTO topup_transactions (user_id, amount, status) VALUES (?, ?, 'TOPUP')`,
      [userId, amount]
    );
    const [rows] = await conn.query(
      "SELECT balance FROM balance WHERE user_id = ?",
      [userId]
    );
    await conn.commit();
    return rows[0]?.balance || 0;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
module.exports = topupBalance;
