const crypto = require("node:crypto");

async function doTransaction(pool, userId, serviceCode) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [serviceRows] = await conn.query(
      "SELECT service_name, service_tariff FROM services WHERE service_code = ?",
      [serviceCode]
    );
    if (!serviceRows.length) throw new Error("Service tidak ditemukan");
    const { service_name, service_tariff } = serviceRows[0];
    const [balanceRows] = await conn.query(
      "SELECT balance FROM balance WHERE user_id = ?",
      [userId]
    );
    const balance = balanceRows[0]?.balance || 0;
    if (balance < service_tariff) throw new Error("Saldo tidak cukup");
    await conn.query(
      "UPDATE balance SET balance = balance - ? WHERE user_id = ?",
      [service_tariff, userId]
    );
    const invoice = crypto.randomBytes(8).toString("hex");
    await conn.query(
      `INSERT INTO payment_transactions (user_id, service_code, amount, status, invoice_number) VALUES (?, ?, ?, 'PAYMENT', ?)`,
      [userId, serviceCode, service_tariff, invoice]
    );
    const [trxRows] = await conn.query(
      `SELECT created_at FROM payment_transactions WHERE invoice_number = ? LIMIT 1`,
      [invoice]
    );
    await conn.commit();
    return {
      invoice_number: invoice,
      service_code: serviceCode,
      service_name,
      transaction_type: "PAYMENT",
      total_amount: service_tariff,
      created_on: trxRows[0]?.created_at
        ? trxRows[0].created_at.toISOString()
        : null,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
module.exports = doTransaction;
