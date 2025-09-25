import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/format/format-date";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import QuoteRenderPDF from "./quote-render-pdf";
import { useState } from "react";
import DialogDoApproval from "../dialogs/dialog-do-approval";
import DialogReqApproval from "../dialogs/dialog-req-approval";
import DialogRejection from "../dialogs/dialog-rejection";
import Link from "next/link";
import { useQuoteProps } from "@/hooks/useQuoteProps";
import QuoteStagesControl from "./quote-stages-control";
import QuotePdfContol from "./quote-pdf-control";
import useSession from "@/components/session/use-session";

export default function QuoteSummary({
  quote,
  maxDiscount,
  minContributionMargin,
  openGeneratedPdf,
  setOpenGeneratedPdf,
  setQuoteAndSave,
}: any) {
  const { session, isLoading } = useSession();
  const { user } = session;

  const { stages } = useQuoteProps();

  function getDiscountPercentage() {
    if (quote) {
      if (quote.discountType == "percentage") return quote.discountValue / 100;

      if (quote?.priceKitsInCents)
        return (quote.discountValue ?? 0) / quote?.priceKitsInCents;
    }
    return 0;
  }

  // function enableQuotePdf() {
  //   //stages with no margin check
  //   let stagesEnablePdf = [
  //     "approved-by-coordinator",
  //     "approved-by-director",
  //     "checking-out",
  //     //"created-by-integrator",
  //     //"integrator-checking-out",
  //     //"integrator-order-summary",
  //   ];

  //   //if ok to proceeed or approved

  //   let stageFound = stagesEnablePdf.find((el) => el == quote?.stage?.slug);
  //   return (
  //     quoteOKtoProceed() ||
  //     (stageFound ? true : false) ||
  //     user?.role?.name == "director"
  //   );
  // }

  function enableQuotePdf() {
    // let stagesEnablePdf = [
    //   "approved-by-coordinator",
    //   "approved-by-director",
    //   "checking-out",
    //   //"created-by-integrator",
    //   //"integrator-checking-out",
    //   //"integrator-order-summary",
    // ];

    let stagesEnablePdf = [
      "order-completed",
      "checking-out",
      "order-summary",
      "approved-by-coordinator",
      // "created",
      // "awaiting-coordinator-approval",
      //"rejected-by-coordinator",
      //"awaiting-director-approval",
      //"rejected-by-director",
      "approved-by-director",
      "created-in-erp",
      "produced-order",
      "integrator-order-summary",
      "integrator-checking-out",
      "created-by-integrator",
      "canceled",
      "order-canceled",
    ];

    let stageFound = stagesEnablePdf.find((el) => el == quote?.stage?.slug);

    return (
      quoteOKtoProceed() ||
      quote.approvedByCoordinator ||
      quote.approvedByDirector ||
      (stageFound ? true : false)
    );
  }

  function quoteOKtoProceed() {
    return (
      quote &&
      getDiscountPercentage() <= maxDiscount &&
      quote.contributionMargin &&
      quote.contributionMargin >= minContributionMargin
    );
  }

  function quoteCanceled() {
    return quote?.stage?.slug?.includes("canceled");
  }
  return (
    quote && (
      <>
        <Card className="my-10 p-5 bg-slate-500 md:flex justify-stretch ">
          <h2 className="font-extrabold text-white text-xl p-5">
            Total : {formatPriceInCents(quote?.priceInCents ?? 0)}
          </h2>
          {/* <p>
            {JSON.stringify({
              quoteOKtoProceed: quoteOKtoProceed(),
              approvedByDirector: quote.approvedByDirector,
              approvedByCoordinator: quote.approvedByCoordinator,
            })}
          </p> */}
          {enableQuotePdf() && !quoteCanceled() && (
            <QuotePdfContol
              quote={quote}
              openGeneratedPdf={openGeneratedPdf}
              setOpenGeneratedPdf={setOpenGeneratedPdf}
            ></QuotePdfContol>
          )}
          {!quoteCanceled() && (
            <QuoteStagesControl
              quote={quote}
              maxDiscount={maxDiscount}
              minContributionMargin={minContributionMargin}
              openGeneratedPdf={openGeneratedPdf}
              setOpenGeneratedPdf={setOpenGeneratedPdf}
              setQuoteAndSave={setQuoteAndSave}
            ></QuoteStagesControl>
          )}
        </Card>
      </>
    )
  );
}
