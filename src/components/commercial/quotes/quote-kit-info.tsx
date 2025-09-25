"use client";

import { useRouter } from "next/navigation";
import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";

interface QuoteKitInfoProps {
  quoteKit: any;
  showPrices: boolean;
}

export function QuoteKitInfo({ quoteKit, showPrices }: QuoteKitInfoProps) {
  const router = useRouter();

  function fullKitDescription() {
    let inverter = quoteKit?.quoteKitItems?.find(
      (el: any) => el.type == "inverter"
    );

    let moduleItem = quoteKit?.quoteKitItems?.find(
      (el: any) => el.type == "module"
    );

    return `Gerador fotovoltaico ${formatDecimalBr(
      quoteKit?.dcPower ?? 0
    )} kWp,  ${inverter?.price?.product?.name}, ${
      moduleItem?.price?.product?.name
    }`;
  }

  return (
    <div className="mt-2 p-4 mb-2">
      {quoteKit?.price?.product?.image?.url && (
        <img
          className="max-h-[70%] relative lg:left-[-30px] rounded-md scale-[1.3]  lg:scale-[1.3]   mb-[100px]  md:mb-[200px] mt-[50px] lg:mt-[5px]  "
          src={`${process.env.NEXT_PUBLIC_API_URL}/${quoteKit?.price?.product?.image?.url}`}
        />
      )}
      {!quoteKit?.price?.product?.image?.url &&
        quoteKit?.price?.product?.imageUrl && (
          <img
            className="rounded-md"
            src={quoteKit?.price?.product?.imageUrl}
          />
        )}

      <br></br>
    </div>
  );
}
