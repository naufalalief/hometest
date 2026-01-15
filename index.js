const express = require("express");
const { swaggerUi, swaggerSpec } = require("./swagger");
const router = require("./src/routes");
const { z } = require("zod");
const { errorResponse } = require("./src/helper/response");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", router);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      statusCode: 400,
      message: "Request body harus berupa JSON yang valid",
      error: err.message,
    });
  }
  if (err instanceof z.ZodError) {
    return errorResponse(
      res,
      400,
      "Data tidak lengkap atau format salah",
      err.issues
    );
  }
  if (err.status && err.status >= 400) {
    return errorResponse(res, err.status, err.message);
  }
  console.error(err);
  res.status(500).json({
    statusCode: 500,
    message: "Terjadi kesalahan server",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
