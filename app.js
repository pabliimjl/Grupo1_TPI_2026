const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const productosRoutes = require("./routes/productos.routes");
const adminRoutes = require("./routes/admin.routes")

app.use("/api", productosRoutes);
app.use("/admin",adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});