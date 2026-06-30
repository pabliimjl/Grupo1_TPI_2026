const bcrypt = require("bcrypt");
const {Usuario} = require("../ORM/models")(require("../ORM/database/connection"));

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

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios"
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

    // Comparar contraseña
    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

    // Login exitoso
    return res.status(200).json({
      mensaje: "Login exitoso",
      usuario: {
        id: usuario.id,
        email: usuario.email
      }
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

    // buscar usuario
    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    // verificar contraseña actual
    const passwordCorrecta = await bcrypt.compare(
      passwordActual,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Contraseña actual incorrecta"
      });
    }

    // hash nueva contraseña
    const saltRounds = Number(process.env.SALTOS_BCRYPT);
    const hashedPassword = await bcrypt.hash(passwordNueva, saltRounds);

    // actualizar
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

    // buscar usuario
    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    // eliminar
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

module.exports = {
  registrarUsuario,
  login,
  cambiarPassword,
  eliminarUsuario
};