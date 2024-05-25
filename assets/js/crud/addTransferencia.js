import { formatDate } from "./utils.js";
import { getUsuarios } from "./getUsuarios.js";
import { getTransferencias } from "./getTransferencias.js";

const pathPostTransferencia = "/transferencia";
const ERROR_SALDO_INSUFICIENTE = "23514";

export async function addTransferencia({ emisor, receptor, monto }) {
  if (emisor === receptor) {
    Swal.fire({
      title: "Advertencia",
      text: "No se puede realizar una transferencia a sí mismo",
      icon: "warning",
    });
    return;
  }

  try {
    const data = {
      emisor,
      receptor,
      monto,
      fecha: formatDate(new Date()),
    };
    const response = await axios.post(pathPostTransferencia, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      $("#emisor").val("");
      $("#receptor").val("");
      $("#monto").val("");
      getUsuarios();
      getTransferencias();
      Swal.fire({
        title: "Transferencia realizada",
        text: "La transferencia se realizó correctamente",
        icon: "success",
      });
    } else {
      throw new Error("No se pudo agregar la transferencia");
    }
  } catch (error) {
    try {
      const {
        response: {
          data: { code },
        },
      } = error;
      if (code === ERROR_SALDO_INSUFICIENTE) {
        Swal.fire({
          title: "Error",
          text: "Saldo insuficiente para realizar la transferencia por dicho monto",
          icon: "error",
        });
        return;
      }
      alert("Algo salió mal..." + error.message);
    } catch (error) {
      console.log(error.message);
    }
  }
}

