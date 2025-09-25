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

export default function DialogReqApproval({
  open,
  setOpen,
  setQuote,
  quote,
  handleClickItem,
}: any) {
  const { stages } = useQuoteProps();
  const { session, isLoading } = useSession();
  const { user } = session;
  function reqApproval() {
    if (user?.role?.name == "sales-leader") {
      let stageTo = stages.find(
        (el: any) => el.slug == "awaiting-director-approval"
      );
      if (stageTo) {
        setQuote({
          ...quote,
          stage: stageTo,
        });
      } else {
        alert("Erro na mudança de estágio");
      }
    } else {
      let stageTo = stages.find(
        (el: any) => el.slug == "awaiting-coordinator-approval"
      );
      if (stageTo) {
        setQuote({
          ...quote,
          stage: stageTo,
        });
      } else {
        alert("Erro na mudança de estágio");
      }
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80%] max-h-[90%]  w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicitar aprovação</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <p>Deseja solicitar a aprovação?</p>
          <div className="flex items-stretch justify-between my-10">
            <Button className="bg-green-600" onClick={reqApproval}>
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
