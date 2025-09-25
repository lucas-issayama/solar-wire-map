export function formatIe(inscricaoEstadual: string) {
  if (!inscricaoEstadual) return inscricaoEstadual;

  inscricaoEstadual = inscricaoEstadual.replace(/\D/g, "");

  while (inscricaoEstadual.length < 11) {
    inscricaoEstadual = "_" + inscricaoEstadual;
  }

  if (inscricaoEstadual.length > 12)
    inscricaoEstadual = inscricaoEstadual.substring(0, 12);

  return `${inscricaoEstadual.slice(0, 3)}.${inscricaoEstadual.slice(
    3,
    6
  )}.${inscricaoEstadual.slice(6, 9)}.${inscricaoEstadual.slice(9)}`;
}
