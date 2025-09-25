import { Quote } from "@/types/quote";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import QuoteInputPercentage from "./quote-input-percentage";
import QuoteInputMoney from "./quote-input-money";
import SelectCalcType from "./select-calc-type";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";

interface QuoteIntegratorServicesCardProps {
  quote: Quote;
  setQuote?(quote: Quote): void;
  editable: boolean;
}

export function QuoteIntegratorServicesCard({
  quote,
  setQuote,
  editable,
}: QuoteIntegratorServicesCardProps) {
  function setCalcType(value: any) {
    if (quote.integratorServicesType !== value) {
      if (setQuote)
        setQuote(
          quoteRecalc({
            ...quote,
            integratorServicesType: value,
            integratorServicesValue: 0,
          })
        );
    }
  }

  function setIntegratorServicesValue(value: any) {
    if (setQuote) {
      //setQuote(quoteRecalc({ ...quote, integratorServicesValue: value }));
      setQuote(
        quoteRecalc({
          ...quote,
          integratorServicesValue: value >= 0 ? value : 0,
        })
      );
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex">
          <SelectCalcType
            setValue={setCalcType}
            value={quote.integratorServicesType}
            disabled={editable == false}
          ></SelectCalcType>
          {quote.integratorServicesType == "percentage" && (
            <QuoteInputPercentage
              label="% em relação aos kits"
              value={quote.integratorServicesValue}
              setValue={setIntegratorServicesValue}
              disabled={editable == false}
            ></QuoteInputPercentage>
          )}

          {quote.integratorServicesType == "money" && (
            <QuoteInputMoney
              label="Valor"
              value={quote.integratorServicesValue}
              setValue={setIntegratorServicesValue}
              disabled={editable == false}
            ></QuoteInputMoney>
          )}
        </div>

        <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md  flex justify-center mt-4  w-[250px]">
          {formatPriceInCents(quote.integratorServicesInCents)}
        </div>
      </div>
    </div>
  );
}
