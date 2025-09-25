"use client";

import { Button } from "@/components/ui/button";
import DetailedDocument from "@/lib/react-pdf/detailed-document";
import BasicDocument from "@/lib/react-pdf/basic-document";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuoteRenderPDF from "./quote-render-pdf";
import { toast } from "@/hooks/use-toast";
import useSession from "@/components/session/use-session";

interface QuotePdfContolProps {
  quote: any;
  openGeneratedPdf: boolean;
  setOpenGeneratedPdf: any;
}

export default function QuotePdfContol({
  quote,
  openGeneratedPdf,
  setOpenGeneratedPdf,
}: QuotePdfContolProps) {
  const { session, isLoading } = useSession();
  const { user } = session;

  function validadeAndCreatePdf() {
    if (!quote?.enterprise?.id) {
      toast({
        title: "",
        description: "Preencher integrador",
        variant: "warning",
      });
      return false;
    }

    if (user?.role?.type == "sales" && quote?.enterprise.id == 1) {
      toast({
        title: "",
        description: "Preencher integrador correto (Não CorSolar)",
        variant: "warning",
      });
      return false;
    }

    setOpenGeneratedPdf(true);
  }

  return (
    <div>
      <>
        {!openGeneratedPdf ? (
          <div>
            <Button
              className="m-5 text-xl p-5 bg-tertiary font-bold"
              onClick={() => validadeAndCreatePdf()}
            >
              IMPRIMIR PDF
            </Button>
          </div>
        ) : (
          ""
        )}

        {openGeneratedPdf ? <QuoteRenderPDF quote={quote} /> : ""}
      </>
    </div>
  );
}
