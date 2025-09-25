export function extrairPrefixoLogradouro(endereco?: string) {
  const prefixos = {
    Rua: ["Rua", "R."],
    Avenida: ["Avenida", "Av", "Av."],
    Travessa: ["Travessa", "Tv", "Tv."],
    Alameda: ["Alameda", "Al", "Al."],
    Estrada: ["Estrada", "Est", "Est."],
    Rodovia: ["Rodovia", "Rod", "Rod."],
    Praça: ["Praça", "Pç", "Pç."],
    Largo: ["Largo", "Lgo", "Lgo."],
    Quadra: ["Quadra", "Qd", "Qd."],
    // Viela: ["Viela", "Vl", "Vl."],
    // Caminho: ["Caminho", "Cam", "Cam."],
    // Servidão: ["Servidão", "Serv", "Serv."],
    // Beco: ["Beco", "Bco", "Bco."],
    // Passarela: ["Passarela"],
    // Passagem: ["Passagem", "Psg", "Psg."],
    // Contorno: ["Contorno"],
  };

  const todasVariacoes = Object.values(prefixos).flat();

  // ^ = início da string, \s* = ignora espaços antes do prefixo, (?=\s|$) = exige que tenha um espaço depois ou fim da string
  const regex = new RegExp(`^\\s*(${todasVariacoes.join("|")})(?=\\s|$)`, "i");

  const resultado = endereco?.match(regex);

  if (resultado) {
    const encontrado = resultado[1].toLowerCase();
    for (const [normalizado, variacoes] of Object.entries(prefixos)) {
      if (variacoes.some((v) => v.toLowerCase() === encontrado)) {
        return normalizado;
      }
    }
  }

  return null;
}
