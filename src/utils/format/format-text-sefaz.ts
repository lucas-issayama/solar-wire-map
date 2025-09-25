export function formatTextSefaz(description: string) {
  return description
    .normalize("NFD") // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .replace(/[^a-zA-Z0-9\s\-\.\/]/g, "") // remove outros caracteres especiais
    .trim(); // remove espaços extras nas pontas
}
