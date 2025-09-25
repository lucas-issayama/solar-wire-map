export function formatCNPJ(cnpj: string) {
  if (!cnpj) return cnpj;

  // Remove any non-digit characters
  cnpj = cnpj.replace(/[^\d]/g, "");

  // Add leading zeros if needed
  while (cnpj.length < 14) {
    cnpj = "_" + cnpj;
  }

  if (cnpj.length > 14) cnpj = cnpj.substring(0, 14);

  // Format CNPJ with dots and slashes
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
    5,
    8
  )}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
}
