import { extrairPrefixoLogradouro } from "./extrair-prefixo-logradouro";

export function extrairTextoLogradouro(endereco?: string) {
  const prefixo = extrairPrefixoLogradouro(endereco);

  if (!prefixo) return endereco?.trim(); // Se não tiver prefixo, retorna o endereço todo

  // Remove o prefixo usando regex, com espaço opcional depois
  const regex = new RegExp(
    `^\\s*(${prefixo}|${prefixo.slice(0, 2)}\\.)\\s*`,
    "i"
  );
  return endereco?.replace(regex, "").trim();
}
