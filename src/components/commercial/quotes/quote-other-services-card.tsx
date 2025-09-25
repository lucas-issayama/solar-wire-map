"use client";

import CardPrimary from "@/components/ui/card-primary";
import { useRouter } from "next/navigation";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import { Switch } from "@/components/ui/switch";
import { formatPercent } from "@/utils/format/format-percent";
import { QuoteIntegratorServicesCard } from "./discount/quote-integrator-services-card";

interface QuoteOtherServicesCardProps {
  editable: boolean;
  quote: any;
  setQuote: any;
  variables: any;
}

export default function QuoteOtherServicesCard({
  editable,
  quote,
  setQuote,
  variables,
}: QuoteOtherServicesCardProps) {
  const router = useRouter();

  function onChangeActiveShippingAssistant(value: boolean) {
    let checked = value;
    let shippingAssistantPriceVariable = variables?.find(
      (el: any) => el.name == "shippingAssistantPrice"
    );

    if (quote) {
      setQuote(
        quoteRecalc({
          ...quote,
          activeShippingAssistant: checked,
          priceShippingAssistantInCents:
            shippingAssistantPriceVariable.value * 100
              ? shippingAssistantPriceVariable.value * 100
              : 50000,
        })
      );
    }
  }

  function onChangeActiveEngineeringInsurance(value: boolean) {
    let checked = value;
    let engineeringInsuranceFeeVariable = variables?.find(
      (el: any) => el.name == "engineeringInsuranceFee"
    );
    if (quote) {
      setQuote(
        quoteRecalc({
          ...quote,
          activeEngineeringInsurance: checked,
          engineeringInsuranceFee:
            engineeringInsuranceFeeVariable?.value / 100
              ? engineeringInsuranceFeeVariable?.value / 100
              : 3 / 100,
        })
      );
    }
  }

  return (
    <CardPrimary title="OUTROS SERVIÇOS" className="">
      <div className="shadow p-2 m-4 mb-6 border-spacing-5 ">
        <h2 className="text-primary text-md font-bold">SERVIÇO DE DESCARGA</h2>
        {quote && (
          <div className="flex items-center justify-between w-full mb-2 text-base leading-6">
            <Switch
              onCheckedChange={onChangeActiveShippingAssistant}
              checked={quote.activeShippingAssistant ?? false}
              disabled={editable == false}
            />

            {quote.activeShippingAssistant && (
              <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md  flex justify-center mt-4  w-[250px]">
                {formatPriceInCents(quote.priceShippingAssistantInCents)}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shadow p-2 m-4 mb-6 border-spacing-5 ">
        <h2 className="text-primary text-md font-bold">SEGURO ENGENHARIA</h2>
        {quote && (
          <div className="flex items-center justify-between w-full mb-2 text-base leading-6">
            <Switch
              disabled={editable == false}
              onCheckedChange={onChangeActiveEngineeringInsurance}
              checked={quote.activeEngineeringInsurance ?? false}
            />
            {quote.activeEngineeringInsurance && (
              <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md  flex justify-center mt-4  w-[250px]">
                {formatPriceInCents(quote.priceEngineeringInsuranceInCents)} ({" "}
                {formatPercent(quote.engineeringInsuranceFee)})
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shadow p-2 m-4 mb-6 border-spacing-5 ">
        <h2 className="text-primary text-md font-bold">REPASSE</h2>
        <br></br>

        {quote && (
          <QuoteIntegratorServicesCard
            editable={editable}
            quote={quote}
            setQuote={setQuote}
          ></QuoteIntegratorServicesCard>
        )}
      </div>
    </CardPrimary>
  );
}
