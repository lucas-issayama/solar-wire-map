import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import { Card } from "@/components/ui/card";
import useSession from "@/components/session/use-session";
import { QuoteDiscountCard } from "./discount/quote-discount-card";
import CardPrimary from "@/components/ui/card-primary";
import { formatCityFullNameFromAddress } from "@/utils/format/format-city-full-name-from-address";
import { formatAddressSingleLine } from "@/utils/format/format-address-single-line";
import { QuoteKPIs } from "./quote-kpis";
import { QuoteKitLogsTable } from "./quote-kit-logs-table";
import ShippingEstimationCard from "./quote-shipping-estimation-card";
import QuoteOtherServicesCard from "./quote-other-services-card";
import { QuotePayment } from "./quote-payment";
import { InputTextarea } from "@/components/ui/input-textarea";
import QuoteInputMoney from "./discount/quote-input-money";

export function QuoteView({ quote }: any) {
  const { session, isLoading } = useSession();
  const { user } = session;

  return (
    <div className="defaultPage">
      <div className="flex justify-between mx-4">
        <span></span>
        <p>Etapa: {quote.stage?.name}</p>
      </div>
      <CardPrimary className="m-10" title="ORÇAMENTO">
        <div className="flex justify-between ">
          <p>Título : {quote.name}</p>

          <p>Integrador : {quote.enterprise?.name}</p>
        </div>
        <div className="flex justify-between ">
          <p>Cliente : {quote.contact?.name}</p>

          <p>Criador : {quote.creator?.name}</p>
        </div>
      </CardPrimary>

      <CardPrimary title="PRODUTOS" className="m-10">
        <div className="my-10">
          {quote?.quoteKits
            ?.filter((el: any) => !el.deleted)
            .map((quoteKit: any) => (
              <QuoteKitLogsTable
                key={quoteKit.id}
                quoteKit={quoteKit}
              ></QuoteKitLogsTable>
            ))}
        </div>
      </CardPrimary>
      <div className="flex  items-end justify-end my-2 m-10">
        <CardPrimary title="VALOR DO EQUIPAMENTO" className="w-full lg:w-[50%]">
          <div className="flex justify-between p-2">
            <h2 className="text-primary font-bold text-lg  p-2 w-full">
              VALOR TOTAL DO KIT :
            </h2>
            <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md w-full flex justify-center">
              {formatPriceInCents(quote?.priceKitsFinalInCents ?? 0)}
            </div>
          </div>
        </CardPrimary>
      </div>

      <CardPrimary title="INFORMAÇÕES ADICIONAIS DO KIT" className="m-10">
        <QuoteDiscountCard
          quote={quote}
          maxDiscount={1}
          minContributionMargin={0}
          editable={false}
        ></QuoteDiscountCard>
        <br></br>
      </CardPrimary>
      <div className="m-10">
        <ShippingEstimationCard
          editable={false}
          fields={[]}
          onChangeShippingType={() => {}}
          quote={quote}
          setFields={() => {}}
          setQuote={() => {}}
        ></ShippingEstimationCard>

        <QuoteOtherServicesCard
          editable={false}
          setQuote={() => {}}
          quote={quote}
          variables={quote.variables}
        ></QuoteOtherServicesCard>

        <br></br>
        <QuotePayment
          quote={quote}
          setQuote={() => {}}
          editable={false}
        ></QuotePayment>

        <>
          <CardPrimary title="OBSERVAÇÕES INTERNAS">
            <InputTextarea
              setValue={(value: string) => {}}
              value={quote.obs}
            ></InputTextarea>
          </CardPrimary>
          <br />
          <CardPrimary title="OBSERVAÇÕES NA NOTA">
            <InputTextarea
              setValue={(value: string) => {}}
              value={quote.invoiceObs}
            ></InputTextarea>
          </CardPrimary>

          <br></br>

          <CardPrimary title="DESCONTO NO VALOR FINAL">
            <QuoteInputMoney
              label="Desconto final"
              value={quote.discountFinalValue}
              setValue={() => {}}
              disabled={true}
            ></QuoteInputMoney>
          </CardPrimary>
        </>
      </div>

      <CardPrimary title="ENDEREÇO DE FATURAMENTO" className="m-10">
        <p>{formatAddressSingleLine(quote?.invoiceAddress)}</p>
        <p className="m-2">
          {formatCityFullNameFromAddress(quote?.invoiceAddress)}
        </p>
      </CardPrimary>

      <CardPrimary title="ENDEREÇO DE ENTREGA" className="m-10">
        <p>{formatAddressSingleLine(quote?.shippingAddress)}</p>
        <p className="m-2">
          {formatCityFullNameFromAddress(quote?.shippingAddress)}
        </p>
      </CardPrimary>
      <div className="m-4">
        <QuoteKPIs quote={quote}></QuoteKPIs>
      </div>

      <Card className="m-10 p-5 bg-slate-500 md:flex justify-stretch ">
        <h2 className="font-extrabold text-white text-xl p-5">
          Total : {formatPriceInCents(quote?.priceInCents ?? 0)}
        </h2>
      </Card>
    </div>
  );
}
