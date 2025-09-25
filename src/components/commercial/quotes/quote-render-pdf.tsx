"use client";

import { Button } from "@/components/ui/button";
import DetailedDocument from "@/lib/react-pdf/detailed-document";
import BasicDocument from "@/lib/react-pdf/basic-document";
import { AddressGetByQuote } from "@/types/addressesFetchs";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

interface QuoteRenderPDFProps {
  quote: any;
}

export default function QuoteRenderPDF({ quote }: QuoteRenderPDFProps) {
  return (
    <div className="md:flex">
      <div>
        {/* @ts-ignore */}
        <PDFDownloadLink
          document={<BasicDocument quote={quote} />}
          fileName={`Proposta CorSolar ${quote.id}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <Button className="m-5 text-xl p-5 bg-tertiary">
                Gerando pdf..
              </Button>
            ) : (
              <Button className="m-5 text-xl p-5 bg-tertiary">
                PDF SIMPLIFICADO
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
      {/* @ts-ignore */}
      <div>
        {/* @ts-ignore */}
        <PDFDownloadLink
          document={<DetailedDocument quote={quote} />}
          fileName={`Proposta CorSolar ${quote.id}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <Button className="m-5 text-xl p-5 bg-tertiary">
                Gerando pdf..
              </Button>
            ) : (
              <Button className="m-5 text-xl p-5 bg-tertiary">
                PDF COMPLETO
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
