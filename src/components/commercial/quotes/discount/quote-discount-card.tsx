import { Quote } from "@/types/quote";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import SelectDiscount from "./select-discount-type";
import QuoteInputPercentage from "./quote-input-percentage";
import QuoteInputMoney from "./quote-input-money";
import { formatPercent } from "@/utils/format/format-percent";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";

interface QuoteDiscountCardProps {
  quote: Quote;
  setQuote?(quote: Quote): void;
  maxDiscount: number;
  minContributionMargin: number;
  editable: boolean;
}

export function QuoteDiscountCard({
  quote,
  setQuote,
  maxDiscount,
  minContributionMargin,
  editable,
}: QuoteDiscountCardProps) {
  function setDiscountType(value: any) {
    //alert(value);

    if (quote.discountType !== value) {
      if (setQuote)
        setQuote(
          quoteRecalc({ ...quote, discountType: value, discountValue: 0 }, true)
        );
    }
  }

  function setDiscountValue(value: any) {
    //alert(value);
    if (setQuote) {
      setQuote(quoteRecalc({ ...quote, discountValue: value }, true));
    }
  }

  function getDiscountPercentage() {
    if (quote.discountType == "percentage") return quote.discountValue / 100;

    if (quote?.priceKitsInCents)
      return (quote.discountValue ?? 0) / quote?.priceKitsInCents;

    return 0;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row mx-4 ">
        <SelectDiscount
          setValue={setDiscountType}
          value={quote.discountType}
          disabled={editable == false}
        ></SelectDiscount>
        {quote.discountType == "percentage" && (
          <QuoteInputPercentage
            label="Desconto"
            value={quote.discountValue}
            setValue={setDiscountValue}
            disabled={editable == false}
          ></QuoteInputPercentage>
        )}

        {quote.discountType == "money" && (
          <QuoteInputMoney
            label="Desconto"
            value={quote.discountValue}
            setValue={setDiscountValue}
            disabled={editable == false}
          ></QuoteInputMoney>
        )}

        {quote.discountType == "percentage" &&
          (quote.discountValue ?? 0) > 0 && (
            <div>
              <p className="mt-8">
                {formatPriceInCents(
                  (quote.priceKitsInCents * (quote.discountValue ?? 0)) / 100
                )}
              </p>
            </div>
          )}

        <div className="mt-4 mx-5">
          {getDiscountPercentage() > maxDiscount && (
            <p className="text-red-600">
              Desconto muito alto ({formatPercent(getDiscountPercentage())}) -
              (Máximo {formatPercent(maxDiscount)})
            </p>
          )}

          {quote.contributionMargin !== null &&
            quote.contributionMargin !== undefined &&
            quote.contributionMargin < minContributionMargin && (
              <p className="text-red-600">
                Margem de contribuição muito baixa (
                {formatPercent(quote.kitContributionMargin)}) - (Mínimo{" "}
                {formatPercent(minContributionMargin)})
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
