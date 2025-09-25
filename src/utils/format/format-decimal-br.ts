export function formatDecimalBr(value: number) {
  const formattedValue = value;
  if (isNaN(formattedValue)) return "";
  else return formattedValue?.toLocaleString("pt-BR", {});
}
