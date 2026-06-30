const fs = require("fs");
const path = require("path");

const subirImagen = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: "No file" });
    }

    const nombre = (req.body.nombre || "archivo")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

    const ext = path.extname(req.file.filename);

    const nuevoNombre = `${nombre}${ext}`;

    const oldPath = req.file.path;
    const newPath = path.join(path.dirname(oldPath), nuevoNombre);

    fs.renameSync(oldPath, newPath);

    return res.json({
      mensaje: "OK",
      archivo: nuevoNombre,
      ruta: `/images/${nuevoNombre}`
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports={subirImagen}