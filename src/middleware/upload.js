const multer = require("multer");
const path = require("node:path");
const fs = require("node:fs");

const baseUploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(baseUploadDir))
  fs.mkdirSync(baseUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?.id || "unknown";
    const userDir = path.join(baseUploadDir, String(userId));
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const email = req.user.email;
    const emailName = email.split("@")[0].replace(/\s+/g, "").toLowerCase();
    cb(null, `profileimage-${emailName}${ext}`);
  },
});

const upload = multer({ storage });
module.exports = upload;
