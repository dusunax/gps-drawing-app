export function fixedNumber(number: number, decimalPlaces = 1) {
  return parseFloat(number.toFixed(decimalPlaces));
}
