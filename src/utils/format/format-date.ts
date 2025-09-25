import moment from "moment";

export function formatDate(value: string) {
  let d = value ?? new Date(value);
  //  return value ? moment(d).format("DD/MM/YYYY") : "";
  return value ? moment(d).format("DD/MM/YYYY") : "";
}
export function formatDateToDDMMYYYY(): string {
  const today = new Date();

  // Obtendo o dia, mês e ano
  const day = today.getDate();
  const month = today.getMonth() + 1; // getMonth() retorna um valor de 0 a 11, por isso adicionamos 1
  const year = today.getFullYear();

  // Formatando o dia e o mês para ter dois dígitos
  const dayString = day < 10 ? `0${day}` : `${day}`;
  const monthString = month < 10 ? `0${month}` : `${month}`;

  // Construindo a data no formato DD/MM/YYYY
  return `${dayString}/${monthString}/${year}`;
}
