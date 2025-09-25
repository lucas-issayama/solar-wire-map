import { Card } from "@/components/ui/card";
import CardPrimary from "@/components/ui/card-primary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactionTypes } from "@/types/data/transactionTypes";
import { Quote } from "@/types/quote";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import optionsPaymentNumberOfInstallments from "@/utils/payment/options-payment-number-of-installments";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";
import { useEffect, useState } from "react";

interface QuotePaymentProps {
  quote: Quote;
  setQuote: any;
  editable: boolean;
}

export function QuotePayment({ quote, setQuote, editable }: QuotePaymentProps) {
  //Read from server
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, label: "Boleto à vista" }, // , slug: "invoice"
    { id: 2, label: "Cartão de crédito" }, // slug: "credit-card"
    { id: 3, label: "Pix" },
    { id: 4, label: "Financimento" },
    { id: 5, label: "Especial" },
    { id: 6, label: "Depósito em conta" },
  ]);

  let interestRate = 1.33;
  let machineInterestRates = [
    { min: 1, max: 1, interestRate: 2.07 },
    { min: 2, max: 6, interestRate: 2.18 },
    { min: 7, max: 12, interestRate: 2.65 },
  ];

  function getPaymentInfo(amount: number, numberOfInstallments: number) {
    let month = 1;

    let installments = [];
    let installmentPrice = amount / numberOfInstallments;
    let machineInterestRate = machineInterestRates.find(
      (el) => el.min <= numberOfInstallments && el.max >= numberOfInstallments
    )?.interestRate;
    let interestMachine = (installmentPrice * (machineInterestRate ?? 0)) / 100;

    while (month <= numberOfInstallments) {
      let interestPrice =
        ((1 + interestRate / 100) ** month - 1) * installmentPrice;
      installments.push({
        month,
        installmentPrice,
        interestMachine,
        interestPrice,
      });
      month++;
    }

    let amountInterest = installments.reduce(
      (acc, curr) => acc + curr.interestMachine + curr.interestPrice,
      0
    );
    let amountWithouInterest = amount - amountInterest;
    let factor = amountWithouInterest / amount;
    let finalAmount = amount / factor;
    let finalInstallmentPrice = finalAmount / numberOfInstallments;
    let totalInterestAmount = finalAmount - amount;

    return {
      installments,
      amountWithouInterest,
      factor,
      finalAmount,
      finalInstallmentPrice,
      totalInterestAmount,
    };
  }

  function selectPaymentMethod(idString: string) {
    let found = paymentMethods.find((el) => el.id == parseInt(idString));
    if (found) {
      let paymentInterestAmountInCents = 0;
      if (found.id == 2) {
        let paymentInfo: any = getPaymentInfo(
          quote.priceInCents,
          quote.paymentNumberOfInstallments ?? 1
        );
        paymentInterestAmountInCents = parseInt(
          paymentInfo?.totalInterestAmount
        );
      }

      setQuote(
        quoteRecalc({
          ...quote,
          paymentMethod: found,
          paymentNumberOfInstallments: quote.paymentNumberOfInstallments ?? 1,
          paymentInterestAmountInCents,
        })
      );
    }
  }

  function selectNumberOfInstallments(value: string) {
    let paymentNumberOfInstallments = parseInt(value);
    let paymentInterestAmountInCents = 0;
    if (quote.paymentMethod.id == 2) {
      let paymentInfo: any = getPaymentInfo(
        quote.priceInCents,
        paymentNumberOfInstallments ?? 1
      );
      paymentInterestAmountInCents = parseInt(paymentInfo?.totalInterestAmount);
    }

    setQuote(
      quoteRecalc({
        ...quote,
        paymentNumberOfInstallments,
        paymentInterestAmountInCents,
      })
    );
  }

  function onChangeTransactionType(value: string) {
    console.log(value);
    if (quote) {
      setQuote(
        {
          ...quote,
          transactionType: parseInt(value),
        } //)
      );
    }
  }

  return (
    <CardPrimary title="CONDIÇÃO DE PAGAMENTO">
      <div className="lg:grid grid-cols-12 gap-4 w-full p-5 block">
        <div className="col-span-6">
          <h2 className="text-primary text-md font-bold">FORMA DE PAGAMENTO</h2>
          <Select
            value={quote?.paymentMethod?.id?.toString()}
            onValueChange={selectPaymentMethod}
            disabled={editable == false}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolher condição de pagamento" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((el) => (
                <SelectItem key={el.id.toString()} value={el.id.toString()}>
                  {el.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {quote?.paymentMethod?.id == 2 && (
          <div className="col-span-2">
            <p>Parcelas</p>
            <Select
              value={quote?.paymentNumberOfInstallments?.toString()}
              onValueChange={selectNumberOfInstallments}
              disabled={editable == false}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Parcelas" />
              </SelectTrigger>
              <SelectContent>
                {optionsPaymentNumberOfInstallments.map((el) => (
                  <SelectItem key={el} value={el?.toString()}>
                    {el}
                  </SelectItem>
                ))}
                {/* <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="11">11</SelectItem>
                <SelectItem value="12">12</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        )}
        {quote?.paymentMethod?.id !== 2 && <div className="col-span-2"></div>}
        <div className="col-span-4 flex justify-end">
          <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md  flex justify-center mt-4  w-[250px]">
            {/* {quote?.paymentMethod?.id == 2 && (
              <span>
                {" "}
                {quote.paymentNumberOfInstallments}x de{" "}
                {formatPriceInCents(
                  (quote.priceInCents + quote.paymentInterestAmountInCents) /
                    quote.paymentNumberOfInstallments
                )}
              </span>
            )} */}

            {quote?.paymentMethod?.id == 2 && (
              <span>
                {" "}
                {quote.paymentNumberOfInstallments}x de{" "}
                {formatPriceInCents(
                  quote.priceInCents / quote.paymentNumberOfInstallments
                )}
              </span>
            )}
            {quote?.paymentMethod?.id !== 2 && (
              <span>{formatPriceInCents(quote.priceInCents)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-12 gap-4 w-full p-5 block">
        <div className="col-span-6">
          <h2 className="text-primary text-md font-bold">TIPO DE OPERAÇÃO</h2>
          <Select
            value={quote?.transactionType?.toString() ?? "0"}
            onValueChange={onChangeTransactionType}
            disabled={editable == false}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de operação" />
            </SelectTrigger>
            <SelectContent>
              {transactionTypes.map((el) => (
                <SelectItem key={el.value} value={el.value?.toString()}>
                  {el.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="col-span-6"></div> */}
      </div>
    </CardPrimary>
  );
}
