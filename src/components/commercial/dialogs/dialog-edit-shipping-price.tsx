import useSession from "@/components/session/use-session";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputNumberInCents } from "@/components/ui/input-number-in-cents";
import { useState } from "react";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";
import { Switch } from "@mui/material";

export default function DialogEditShippingPrice({
  open,
  setOpen,
  setQuote,
  quote,
}: any) {
  const { session, isLoading } = useSession();
  const [priceShippingInCents, setPriceShippingInCents] = useState(
    quote?.manPriceShippingInCents
  );

  const [isManual, setIsManual] = useState(priceShippingInCents > 0);
  function confirm() {
    setQuote(
      quoteRecalc({ ...quote, manPriceShippingInCents: priceShippingInCents })
    );
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80%] max-h-[90%]  w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar valor frete (R$)</DialogTitle>
        </DialogHeader>
        {/* <p>{quote.manPriceShippingInCents}</p> */}
        <Card className="p-10">
          <span>Valor manual</span>{" "}
          <Switch
            checked={isManual}
            onChange={(ev) => {
              setIsManual(ev.target.checked);
              if (!ev.target.checked) {
                setPriceShippingInCents(0);
              }
            }}
          ></Switch>
          <InputNumberInCents
            value={priceShippingInCents}
            setValue={(value) => {
              setPriceShippingInCents(value);
              if (value) {
                setIsManual(true);
              } else {
                setIsManual(false);
              }
            }}
          ></InputNumberInCents>
          <br />
          {/* <p>{priceShippingInCents}</p> */}
          <p>Confima novo valor?</p>
          <div className="flex items-stretch justify-between my-10">
            <Button
              className="bg-green-600"
              onClick={(ev) => {
                confirm();
              }}
            >
              Sim
            </Button>

            <Button className="" onClick={(el) => setOpen(false)}>
              Não
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
