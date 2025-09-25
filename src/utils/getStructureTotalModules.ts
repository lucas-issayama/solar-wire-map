import { QuoteKit } from "@/types/quote";

export default function getStructureTotalModules(_quoteKit: QuoteKit) {
  return _quoteKit?.layoutItems?.reduce(
    (acc, curr) => acc + curr?.rows * curr?.columns,
    0
  );
}
