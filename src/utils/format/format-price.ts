export function formatPrice(value: number | undefined) {
  const formattedValue = value ? value : "Não informado";
  return formattedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
