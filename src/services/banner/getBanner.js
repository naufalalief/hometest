async function getBannerList(pool) {
  const [rows] = await pool.query(
    "SELECT banner_name, banner_image, description FROM banner"
  );
  return rows;
}

module.exports = getBannerList;
