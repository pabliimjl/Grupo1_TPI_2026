const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors({
    origin: "*", // en desarrollo
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// routes
const productosRoutes = require("./routes/productos.routes");

app.use("/api/productos", productosRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});