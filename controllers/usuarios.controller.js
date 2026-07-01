const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { listarLubricantes, listarEstetica } = require("./productos.controller");
const {Usuario,Producto,EsteticaVehicular, Lubricante} = require("../ORM/models")(require("../ORM/database/connection"));

async function registrarUsuario(req, res) {
    
  const saltRounds = Number(process.env.SALTOS_BCRYPT);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios"
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await Usuario.create({
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      mensaje: "Usuario creado"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al registrar"
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios"
      });
    }

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

    const token = jwt.sign(
      {
        email: usuario.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    });

    return res.status(200).json({
      mensaje: "Login exitoso"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al iniciar sesión"
    });
  }
}

async function cambiarPassword(req, res) {
  try {
    const { email, passwordActual, passwordNueva } = req.body;

    if (!email || !passwordActual || !passwordNueva) {
      return res.status(400).json({
        mensaje: "Email, contraseña actual y nueva contraseña son obligatorios"
      });
    }

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      passwordActual,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Contraseña actual incorrecta"
      });
    }

    const saltRounds = Number(process.env.SALTOS_BCRYPT);
    const hashedPassword = await bcrypt.hash(passwordNueva, saltRounds);

    await usuario.update({
      password: hashedPassword
    });

    return res.status(200).json({
      mensaje: "Contraseña actualizada correctamente"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al cambiar contraseña"
    });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        mensaje: "El email es obligatorio"
      });
    }

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    await usuario.destroy();

    return res.status(200).json({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al eliminar usuario"
    });
  }
}

async function logout(req, res) {

    res.clearCookie("token");

    return res.redirect("/login");

}

async function mostrarAdmin(req, res) {

    try {

        const lubricantes = await Producto.findAll({
            where: {
                tipo_producto: "lubricante"
            },
            include: [{
                model: Lubricante,
                as: "lubricante"
            }],
            order: [['id', 'ASC']]
        });

        const esteticas = await Producto.findAll({
            where: {
                tipo_producto: "estetica_vehicular"
            },
            include: [{
                model: EsteticaVehicular,
                as: "esteticaVehicular"
            }],
            order: [['id', 'ASC']]
        });
        
        

        res.render("admin", {
            lubricantes,
            esteticas
        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Error al cargar el panel.");

    }

}

async function mostrarEditarProducto(req, res) {
    const { id } = req.params;

    const producto = await Producto.findOne({
        where: { id },
        include: [
            {
                model: Lubricante,
                as: "lubricante"
            },
            {
                model: EsteticaVehicular,
                as: "esteticaVehicular"
            }
        ]
    });

    return res.render("editar-producto", { producto });
}

async function mostrarFormularioNuevoProducto(req, res) {
    try {
        return res.render("nuevo-producto");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al cargar formulario");
    }
}

module.exports = {
  registrarUsuario,
  login,
  cambiarPassword,
  eliminarUsuario,
  logout,
  mostrarAdmin,
  mostrarEditarProducto,
  mostrarFormularioNuevoProducto
};