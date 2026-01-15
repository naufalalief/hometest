async function getAllServices(pool) {
  const [rows] = await pool.query(
    "SELECT service_code, service_name, service_icon, service_tariff FROM services"
  );
  return rows;
}
module.exports = getAllServices;
