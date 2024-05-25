import {
  getUsersQuery,
  addUserQuery,
  deleteUserQuery,
  editUserQuery,
  getTransferenciasQuery,
  postAddTransferenciaQuery,
  deleteTransferenciaQuery,
  resetDataQuery,
} from "../queries/consultas.js";

// 4.Capturar los posibles errores que puedan ocurrir a través de bloques catch o parámetros de funciones callbacks para condicionar las funciones del servidor. (1 Punto)
// A continuación muestro los 9 controllers manejando los errores mediante bloques trycatch:
export function renderHome(req, res) {
  res.sendFile("views/index.html", { root: "." });
}

// PASO 2 PREGUNTA 3: la cual utiliza la función getUsers siguiente:
export async function getUsers(req, res) {
  try {
    const users = await getUsersQuery();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addUser(req, res) {
  try {
    const data = req.body;

    const result = await addUserQuery([data.nombre, data.balance]);

    res.status(200).send(result); // Corrección: enviar 'result' en lugar de 'data'
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.query;
    const result = await deleteUserQuery(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function editUser(req, res) {
  try {
    const { id } = req.query;
    const data = req.body;

    const result = await editUserQuery([id, data.nombre, data.balance]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getTransferencias(req, res) {
  try {
    const transferencias = await getTransferenciasQuery();
    res.status(200).send(transferencias);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postAddTransferencia(req, res) {
  try {
    const data = req.body;
    const result = await postAddTransferenciaQuery(data);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteTransferencia(req, res) {
  try {
    const { id } = req.query;
    const result = await deleteTransferenciaQuery(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function resetData(req, res) {
  try {
    await resetDataQuery();
    res.status(200).send("Data Reseteada");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function notFound(req, res) {
  res.status(404).sendFile("views/no_found.html", { root: "." });
}
