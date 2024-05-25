export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export function formatearToChileanPeso(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value);
}
