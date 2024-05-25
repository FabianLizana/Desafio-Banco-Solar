import { getTransferencias } from "./getTransferencias.js";
const pathDeleteTransferencia = "/transferencia";

export const deleteTransferencia = async (id) => {
  try {
    const response = await axios.delete(`${pathDeleteTransferencia}?id=${id}`);
    if (response.status === 200) {
      getTransferencias();
      Swal.fire({
        title: "Transferencia eliminada",
        text: "La transferencia se elimino correctamente",
        icon: "success",
      });
    } else {
      throw new Error("No se pudo eliminar la transferencia");
    }
  } catch (error) {
    console.log(error.message);
  }
};
