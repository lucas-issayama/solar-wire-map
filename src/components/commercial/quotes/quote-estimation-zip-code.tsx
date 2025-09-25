import { LoadingIcon } from "@/components/icons/loading";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Quote } from "@/types/quote";
import formatZipCode from "@/utils/format/format-zip-code";
import viacepApi from "@/utils/viacep/viacepApi";
import { useState } from "react";

interface QuoteEstimationZipCodeProps {
  quote: Quote;
  setQuote?(quote: Quote): void;
  setQuoteEstimationZipCode?(quote: Quote): void;
  disabled?: boolean;
}

export function QuoteEstimationZipCode({
  quote,
  setQuote,
  setQuoteEstimationZipCode,
  disabled,
}: QuoteEstimationZipCodeProps) {
  const [loadingZipCode, setLoadingZipCode] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d]/g, ""); // Remove non-numeric characters
    if (quote && setQuote)
      setQuote({ ...quote, shippingEstimationZipCode: rawValue });
  };

  async function handleBlur() {
    setLoadingZipCode(true);
    if (
      quote &&
      quote.shippingEstimationZipCode &&
      !quote.shippingAddress?.zipCode
    ) {
      let ans: any = await viacepApi.searchZipCode(
        quote.shippingEstimationZipCode
      );
      if (!ans?.stateShortName || !ans?.cityName) {
        toast({
          title: "Cep não encontrado",
          description: "",
          variant: "warning",
        });
      }
      if (setQuoteEstimationZipCode && ans?.stateShortName && ans?.cityName) {
        // if (ans.cityName && ans?.stateShortName) {
        setQuoteEstimationZipCode({
          ...quote,
          shippingEstimationStateShortName: ans?.stateShortName,
          shippingEstimationCityName: ans?.cityName,
        });
      }
    }
    setLoadingZipCode(false);
  }
  return (
    <div>
      {loadingZipCode && (
        <div className="flex items-center justify-start w-full mb-2 text-base leading-6">
          <LoadingIcon></LoadingIcon>
          Calculando frete
        </div>
      )}

      {(quote && !quote.shippingAddress?.zipCode ? true : false) && (
        <div className="w-full  rounded-md my-5 ">
          <p className="text-primary font-bold">CEP</p>
          <Input
            disabled={disabled}
            className="w-full"
            placeholder="CEP"
            type="text"
            value={formatZipCode(quote?.shippingEstimationZipCode ?? "")}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
      )}
    </div>
  );
}
