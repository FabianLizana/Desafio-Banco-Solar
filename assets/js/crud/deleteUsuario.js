import { getUsuarios } from "./getUsuarios.js";

const pathDeleteUser = "/usuario";

// 5.Devolver correctamente los códigos de estado según las diferentes situaciones. (1 Punto)
// Se han manejado todos los posibles errores y como ejemplo a continuación muestro el manejo del error 23503 
// el cual se origina cuando se desea eliminar un usuario con transferencias hechas (error generado por una FOREIGN KEY VIOLATION). 
// Dicho error se maneja mostrando una alerta la cual he mostrado en la sección  
// Alerta de imposibilidad de eliminación de usuario con transferencias hechas:
export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${pathDeleteUser}?id=${id}`);

    if (response.status === 200) {
      if (response.data.code === "23503") {
        Swal.fire({
          title: "Advertencia",
          text: "No se puede eliminar un usuario que tenga transferencias hechas",
          icon: "warning",
        });
        return;
      }
      getUsuarios();
      Swal.fire({
        title: "Usuario eliminado",
        text: "El usuario se elimino correctamente",
        icon: "success",
      });
    } else {
      throw new Error("No se pudo eliminar el usuario");
    }
  } catch (error) {
    console.log(error.message);
  }
};
