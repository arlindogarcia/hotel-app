export function formatMoney(valor: number | string): string {
  if (typeof valor == "string") {
    valor = parseFloat(valor);
  }
  return valor.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  });
}
