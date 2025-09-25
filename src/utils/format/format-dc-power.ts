export function formatDcPower(value: number) {
  const formattedValue = value;
  return formattedValue?.toLocaleString("pt-BR", {}) + "kWp";
}
