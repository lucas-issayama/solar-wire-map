import { useRouter } from "next/navigation";
import { QuoteItem } from "@/types/quote";
import useSession from "@/components/session/use-session";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import { useQuoteProps } from "@/hooks/useQuoteProps";
import { toast } from "@/hooks/use-toast";

export default function DialogItemsNotAvailable({ open, setOpen, items }: any) {
  //const { stages } = useQuoteProps();
  const { session, isLoading } = useSession();
  const { user } = session;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80%] max-h-[90%]  w-[500px]">
        <DialogHeader>
          <DialogTitle>Ítens não disponíveis</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <b>Deseja realmente finalizar pedido?</b>
          <p>(Esta ação não poder ser desfeita)</p>
          <div className="flex items-stretch justify-between my-10">
            <br></br>

            <Button className="" onClick={(el) => setOpen(false)}>
              OK
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
