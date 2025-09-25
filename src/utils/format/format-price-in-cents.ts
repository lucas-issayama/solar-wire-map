export function formatPriceInCents(value: number | undefined) {
  const formattedValue = value ? value / 100 : 0;
  return formattedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
