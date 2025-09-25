import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import { Card } from "@/components/ui/card";
import useSession from "@/components/session/use-session";
import { formatPercent } from "@/utils/format/format-percent";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import isQuoteSingleItems from "@/utils/is-quote-single-items";

import { exportToExcelQuote } from "@/utils/format/export-to-excel-quote";
import updatePricesItemsRecalc from "@/utils/quoteFunctions/update-prices-items-recalc";
import { getDataToExportQuote } from "@/utils/quoteFunctions/get-data-to-export-quote";
import getDataToExportQuoteKit from "@/utils/quoteFunctions/get-data-to-export-quote-kit";

export function QuoteKPIs({ quote }: any) {
  const { session, isLoading } = useSession();
  const { user } = session;

  function donwloadExcel() {
    // let data = quote?.quoteKits?.[0]?.quoteKitItems
    //   ?.filter((el: any) => !el.deleted)
    //   .map((item: any) => ({
    //     Nome: item.name,
    //     Quantity: item.quantity,
    //     "Custo (R$)": (item.quantity * item.costInCents) / 100,
    //     "Receita (R$)": (item.quantity * item.finalRevenueInCents) / 100,
    //     "Preço na nota (R$)": (item.quantity * item.finalPriceInCents) / 100,
    //   }));

    // if (data?.length) {
    //   data.push({
    //     Nome: "Montagem",
    //     Quantity: 1,
    //     "Custo (R$)": quote.priceAssemblyInCents / 100,
    //   });

    //   data.push({
    //     Nome: "Repasse integrador",
    //     Quantity: 1,
    //     "Custo (R$)": (quote?.integratorServicesInCents * 0.9075) / 100,
    //   });

    //   data.push({
    //     Nome: "Ajudante entrega",
    //     Quantity: 1,
    //     "Custo (R$)": (quote.priceShippingAssistantInCents ?? 0) / 100,
    //   });

    //   data.push({
    //     Nome: "Seguro engenharia",
    //     Quantity: 1,
    //     "Custo (R$)": (quote ?? 0) / 100,
    //   });

    //   data.push({
    //     Nome: "Juros",
    //     Quantity: 1,
    //     "Custo (R$)": (quote.paymentInterestAmountInCents ?? 0) / 100,
    //   });

    //   data.push({
    //     Nome: "Frete",
    //     Quantity: 1,
    //     "Custo (R$)": quote.costShippingInCents / 100,
    //   });
    // }
    let data = getDataToExportQuote(quote);

    console.log(JSON.stringify({ data }));

    let quoteUpdated = {
      ...updatePricesItemsRecalc(
        JSON.parse(JSON.stringify(quote)),
        quote?.priceKitsFinalInCents
      ),
    };

    let data2 = getDataToExportQuoteKit(quoteUpdated);
    //let data2: any = [];
    console.log(JSON.stringify({ data2 }));
    // Export the data to Excel
    exportToExcelQuote(quote, data, data2, `Proposta ${quote?.id}`);
  }

  return (
    quote && (
      <div className="m-0 p-0 sm:p-0 md:p-4">
        {/* Resumo vendas */}
        {user?.role?.name == "sales" && (
          <Card className="p-5 bg-slate-200">
            <p>Resumo</p>

            <table>
              <thead>
                <tr>
                  <th className="md:min-w-[250px] p-4 mx-5 text-start">-</th>

                  <th className="w-[120px] p-4 text-start ">Preço</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kits</td>

                  <td>{formatPriceInCents(quote?.priceKitsFinalInCents)}</td>
                </tr>

                <tr>
                  <td>Frete</td>

                  <td>
                    {formatPriceInCents(
                      quote?.priceShippingInCents ??
                        quote?.shippingEstimationPriceInCents
                    )}
                  </td>
                </tr>
                {quote?.activeShippingAssistant && (
                  <tr>
                    <td>Assitente</td>

                    <td>
                      {formatPriceInCents(quote?.priceShippingAssistantInCents)}
                    </td>
                  </tr>
                )}
                {quote?.activeEngineeringInsurance && (
                  <tr>
                    <td>Seguro de engenharia</td>

                    <td>
                      {formatPriceInCents(
                        quote?.priceEngineeringInsuranceInCents
                      )}
                    </td>
                  </tr>
                )}

                <tr>
                  <td>Serviços integrador</td>

                  <td>
                    {formatPriceInCents(quote?.integratorServicesInCents)}
                  </td>
                </tr>

                <tr>
                  <td>Total</td>

                  <td>{formatPriceInCents(quote?.priceInCents)}</td>
                </tr>
              </tbody>
            </table>
            <div className="lg:flex ">
              <p className="mx-4 font-extrabold my-2 ">Kit</p>

              <p className="mx-4 font-extrabold my-2">
                MC(%):{formatPercent(quote?.kitContributionMargin)}
              </p>
              <p className="mx-4 my-2">
                MC:{formatPriceInCents(quote?.kitContributionMarginInCents)}
              </p>
            </div>
          </Card>
        )}

        {process.env.NEXT_PUBLIC_MODE == "homolog" && (
          <p>
            {JSON.stringify({
              kitRevenueInCents: quote.kitRevenueInCents,
              costKitsInCents: quote.costKitsInCents,
              priceAssemblyInCents: quote.priceAssemblyInCents,
              integratorServicesInCents: quote.integratorServicesInCents,
              priceShippingAssistantInCents:
                quote.priceShippingAssistantInCents,
              priceEngineeringInsuranceInCents:
                quote.priceEngineeringInsuranceInCents,
            })}
          </p>
        )}
        {/* Cálculos e margem */}
        {getAccessLevelFromRole(user?.role?.type) >= 2 && (
          <Card className="p-5 bg-slate-200">
            <div className="flex justify-between">
              <span>Resumo</span>
              {(isQuoteSingleItems(quote) ||
                process.env.NODE_ENV !== "production") && (
                <button onClick={(ev) => donwloadExcel()}> Download</button>
              )}
            </div>
            {isQuoteSingleItems(quote) ? (
              <p>Tipo de cáculo:Partes e peças</p>
            ) : (
              <p>Tipo de cálculo: Kit</p>
            )}

            <br></br>

            <p>Cálculos e margens</p>
            <table>
              <thead>
                <tr>
                  <th className="md:min-w-[250px] p-4 mx-5 text-start">-</th>
                  <th className="w-[120px] p-4 text-start">Custo</th>
                  <th className="w-[120px] p-4 text-start ">Preço</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kits</td>
                  <td>{formatPriceInCents(quote?.costKitsInCents)}</td>
                  <td>{formatPriceInCents(quote?.priceKitsFinalInCents)}</td>
                </tr>

                <tr>
                  <td>Frete</td>
                  <td>{formatPriceInCents(quote?.costShippingInCents)}</td>
                  <td>
                    {formatPriceInCents(
                      quote?.priceShippingInCents ??
                        quote?.shippingEstimationPriceInCents
                    )}
                  </td>
                </tr>
                {quote?.activeShippingAssistant && (
                  <tr>
                    <td>Assitente</td>
                    <td>
                      {formatPriceInCents(quote?.priceShippingAssistantInCents)}
                    </td>
                    <td>
                      {formatPriceInCents(quote?.priceShippingAssistantInCents)}
                    </td>
                  </tr>
                )}
                {quote?.activeEngineeringInsurance && (
                  <tr>
                    <td>Seguro de engenharia</td>
                    <td>
                      {formatPriceInCents(
                        quote?.priceEngineeringInsuranceInCents
                      )}
                    </td>
                    <td>
                      {formatPriceInCents(
                        quote?.priceEngineeringInsuranceInCents
                      )}
                    </td>
                  </tr>
                )}

                <tr>
                  <td>Serviços integrador</td>
                  <td>
                    {formatPriceInCents(
                      quote?.integratorServicesInCents * 0.9075
                    )}
                  </td>
                  <td>
                    {formatPriceInCents(quote?.integratorServicesInCents)}
                  </td>
                </tr>

                <tr>
                  <td>Juros</td>
                  <td>
                    {formatPriceInCents(quote?.paymentInterestAmountInCents)}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    {formatPriceInCents(
                      (quote?.costKitsInCents ?? 0) +
                        (quote?.integratorServicesInCents ?? 0) +
                        (quote?.activeShippingAssistant
                          ? quote?.priceShippingAssistantInCents
                          : 0) +
                        (quote?.activeEngineeringInsurance
                          ? quote?.priceEngineeringInsuranceInCents
                          : 0)
                    )}
                  </td>
                  <td>{formatPriceInCents(quote?.priceInCents)}</td>
                </tr>
                <></>
              </tbody>
            </table>
            <br></br>
            <div>
              <p>Custo de montagem</p>
              <p>{formatPriceInCents(quote?.priceAssemblyInCents)}</p>
            </div>
            <div className="lg:flex ">
              <p className="mx-4 font-extrabold my-2 ">Kit</p>

              <p className="mx-4 font-extrabold my-2 ">
                Preço: {formatPriceInCents(quote.priceKitsFinalInCents)}
              </p>

              <p className="mx-4 font-extrabold my-2 ">
                Receita:
                {formatPriceInCents(quote.kitRevenueInCents)}
              </p>

              <p className="mx-4 font-extrabold my-2">
                MB(%):{formatPercent(quote?.kitGrossMargin)}
              </p>
              <p className="mx-4 my-2">
                MB:{formatPriceInCents(quote?.kitGrossMarginInCents)}
              </p>

              <p className="mx-4 font-extrabold my-2">
                MC(%):{formatPercent(quote?.kitContributionMargin)}
              </p>
              <p className="mx-4 my-2">
                MC:{formatPriceInCents(quote?.kitContributionMarginInCents)}
              </p>
            </div>

            <div className="lg:flex ">
              <p className="mx-4 font-extrabold my-2 ">Geral</p>

              <p className="mx-4 font-extrabold my-2 ">
                Preço: {formatPriceInCents(quote.priceInCents)}
              </p>

              <p className="mx-4 font-extrabold my-2 ">
                Receita:{formatPriceInCents(quote?.revenueInCents)}
              </p>
              <p className="mx-4 font-extrabold my-2">
                MB(%):{formatPercent(quote?.grossMargin)}
              </p>
              <p className="mx-4 my-2">
                MB:{formatPriceInCents(quote?.grossMarginInCents)}
              </p>

              <p className="mx-4 font-extrabold my-2">
                MC(%):{formatPercent(quote?.contributionMargin)}
              </p>
              <p className="mx-4 my-2">
                MC:{formatPriceInCents(quote?.contributionMarginInCents)}
              </p>
            </div>
          </Card>
        )}
      </div>
    )
  );
}
