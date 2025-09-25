import { Parser as FormulaParser } from "hot-formula-parser";

export default function getItemsFromKitRules(
  kit: any,
  rules: any,
  products: any
) {
  let items = [];

  for (let r = 0; r < rules.length; r++) {
    let rule = rules[r];
    let formulaItems = rule.formula;
    for (let j = 0; j < formulaItems.length; j++) {
      let formulaItem = formulaItems[j];

      let product = products.find(
        (el: any) => el.id == parseInt(formulaItem.id) + 9 * 10 ** 8
      );

      let quantityFormula = formulaItem.qtd;

      quantityFormula = quantityFormula.replace(
        /\[inversor_tipo_\d{1,2}\]/g,
        kit.inverter.acPhases == 3 ? "'Trifásico'" : "'Monofásico'"
      );

      quantityFormula = quantityFormula.replace(
        /\[modulo_quantidade\]/g,
        kit.nModules
      );

      //Solução temporária para não inserir ítens para microinversores

      if (kit.inverter.inverterType == "micro") {
        quantityFormula = "0";
      }

      const parser = new FormulaParser();
      // Define and parse the formula

      const result = parser.parse(quantityFormula);

      if (result.error) {
        console.error(`Error: ${result.error}`);
      } else {
        if (result?.result ?? 0 > 0) {
          items.push({ product, quantity: result.result });
        }
      }
    }
  }

  return items;
}
