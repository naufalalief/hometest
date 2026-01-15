async function getTransactionHistory(pool, userId, offset = 0, limit = 10) {
  const conn = await pool.getConnection();
  try {
    const [paymentRows] = await conn.query(
      `SELECT invoice_number, 'PAYMENT' as transaction_type, s.service_name as description, amount as total_amount, pt.created_at as created_on
       FROM payment_transactions pt
       JOIN services s ON pt.service_code = s.service_code
       WHERE pt.user_id = ?`,
      [userId]
    );
    const [topupRows] = await conn.query(
      `SELECT NULL as invoice_number, 'TOPUP' as transaction_type, 'Topup Balance' as description, amount as total_amount, created_at as created_on
       FROM topup_transactions
       WHERE user_id = ?`,
      [userId]
    );
    const allRows = [...paymentRows, ...topupRows].sort(
      (a, b) => new Date(b.created_on) - new Date(a.created_on)
    );
    return allRows.slice(offset, offset + limit).map(row => ({
      invoice_number: row.invoice_number,
      transaction_type: row.transaction_type,
      description: row.description,
      total_amount: row.total_amount,
      created_on:
        row.created_on instanceof Date
          ? row.created_on.toISOString()
          : row.created_on,
    }));
  } finally {
    conn.release();
  }
}
module.exports = getTransactionHistory;
