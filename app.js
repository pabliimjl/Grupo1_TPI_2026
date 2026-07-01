const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser")

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "public/resources/images")));
app.set("view engine", "ejs");
app.set("views", "./views");

const productosRoutes = require("./routes/productos.routes");
const adminRoutes = require("./routes/admin.routes")
const ventasRoutes = require("./routes/ventas.routes")

app.use("/", productosRoutes);
app.use("/",adminRoutes);
app.use("/",ventasRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});