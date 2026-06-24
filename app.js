const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

const productosRoutes = require("./routes/productos.routes");

app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});