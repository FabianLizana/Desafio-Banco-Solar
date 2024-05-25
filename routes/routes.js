import express from "express";
import {
  renderHome,
  addUser,
  getUsers,
  deleteUser,
  editUser,
  getTransferencias,
  postAddTransferencia,
  deleteTransferencia,
  resetData,
  notFound,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", renderHome);

//rutas CRUD usuarios
// 3.Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL. (3 Puntos)
// ---PASO 1----Se sirve la API REST en la siguiente ruta:
router.get("/usuarios", getUsers);

router.post("/usuario", addUser);

router.delete("/usuario", deleteUser);

router.put("/usuario", editUser);

//rutas CRUD trasnferencias

router.get("/transferencias", getTransferencias);

router.post("/transferencia", postAddTransferencia);

router.delete("/transferencia", deleteTransferencia);

//Resetear Data
// ¡Extra!: Reseteo de data mediante ruta y mediante intervalo de 30 minutos
// --PASO 1---Disponibilizo la ruta reset que permite eliminar toda la data de las tablas utilizadas en la base de datos y crear una data por defecto:
router.get("/reset", resetData);

//No found

router.get("/*", notFound);

export default router;
