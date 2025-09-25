export function getIndFinal(contact: any) {
  if (contact?.ie) return 0; //Normal
  //PJ
  if (contact?.cnpj && contact?.cnpj !== "") {
    return 0;
  }
  //PF and no Ie
  if (contact?.cpf && contact?.cpf !== "") {
    return 1;
  }
  return -1;
}
