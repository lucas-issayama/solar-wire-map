export function formatPercent(value: number | undefined) {
  const formattedValue = value ? value * 100 : 0;
  return `${formattedValue.toLocaleString("pt-BR", {})}%`;
}
