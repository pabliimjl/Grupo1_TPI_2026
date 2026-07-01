const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/resources/images"));
  },

  filename: (req, file, cb) => {
    const id = req.params.id;
    const ext = path.extname(file.originalname);

    cb(null, `producto-${id}${ext}`);
  }
});

module.exports = multer({ storage });