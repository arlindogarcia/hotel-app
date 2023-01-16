export function formatNumber(val: number, decimalPlaces = 0, showZero = false) {
  if (!val) {
    const zeroVal = 0;
    return showZero ? zeroVal.toFixed(decimalPlaces).replace(".", ",") : "";
  }
  if (typeof val === "number") {
    return val
      .toFixed(decimalPlaces)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return parseFloat(val)
      .toFixed(decimalPlaces)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
