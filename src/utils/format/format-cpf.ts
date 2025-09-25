export function formatCpf(cpf: string) {
  if (!cpf) return cpf;
  // Remove any non-digit characters
  cpf = cpf.replace(/[^\d]/g, "");

  // Add leading zeros if needed
  while (cpf.length < 11) {
    cpf = "_" + cpf;
  }

  if (cpf.length > 11) cpf = cpf.substring(0, 11);

  // Format cpf with dots and slashes
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9,
    11
  )}`;
}
