import { QuoteKit } from "@/types/quote";
import { create, all } from "mathjs";
const math = create(all);

export default function evaluateExpression(expression: string) {
  // Replace 'vertical' with "vertical" to use proper string comparison in JavaScript
  const parsedExpression = expression.replace(/'vertical'/g, '"vertical"');
  return math.evaluate(parsedExpression);
}
