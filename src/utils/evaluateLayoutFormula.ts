import { QuoteKit } from "@/types/quote";
import { LayoutItem } from "@/types/structure";
import { Parser as FormulaParser } from "hot-formula-parser";

export default function evaluateLayoutFormula(
  formula: string,
  layoutIem: LayoutItem,
  moduleProduct?: any
) {
  try {
    const parser = new FormulaParser();

    let newExpression = formula;

    newExpression = newExpression.replaceAll("\n", ``);
    newExpression = newExpression.replaceAll("\t", ``);
    newExpression = newExpression.replaceAll(
      "[modulo_quantidade]",
      `${layoutIem.columns * layoutIem.rows}`
    );

    newExpression = newExpression.replaceAll(
      "[layout_arranjo_modulos]",
      `${layoutIem.columns}`
    );
    newExpression = newExpression.replaceAll(
      "[layout_arranjo_linhas]",
      `${layoutIem.rows}`
    );
    newExpression = newExpression.replaceAll(
      "[layout_arranjo_orientacao]",
      `'${layoutIem.direction}'`
    );

    newExpression = newExpression.replaceAll(
      "[modulo_largura]",
      moduleProduct?.width ?? "1134"
    );

    //console.log(moduleProduct?.height);
    newExpression = newExpression.replaceAll(
      "[modulo_comprimento]",
      moduleProduct?.height ?? "2274"
    );

    const res: any = parser.parse(newExpression).result;
    return res;
  } catch (error) {
    console.log(error);
    return "";
  }
}
