//import moment from "moment";

// export function getExpirationDate(value: string) {
//   let d = value ? new Date(value) : null;
//   if (d) {
//     d.setDate(d.getDate() + 3);
//     //return d;
//     return d.toISOString();
//   }
//   return null;
// }

import moment from "moment-business-days";

moment.updateLocale("us", {
  workingWeekdays: [1, 2, 3, 4, 5],
});

export function getExpirationDate(value: string) {
  if (!value) {
    return null;
  }

  // Inicializa a data usando moment
  const date = moment(value);
  //const date = moment("2025-01-09", "YYYY-MM-DD");
  //console.log(JSON.stringify({ dateBefore: date }));

  // Adiciona 3 dias úteis
  let newDate = date.businessAdd(5);

  //console.log(JSON.stringify({ date }));
  //console.log(JSON.stringify({ newDate }));

  // Retorna a data formatada como ISO string
  return newDate.toISOString();
}
