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

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuoteProps } from "@/hooks/useQuoteProps";
import { set } from "date-fns";

export default function DialogDoApproval({
  open,
  setOpen,
  setQuote,
  quote,
  handleClickItem,
}: any) {
  const { stages } = useQuoteProps();
  const { session, isLoading } = useSession();
  const { user } = session;

  function handleClickItemAndClose(item: any) {
    handleClickItem(item);
    setOpen(false);
  }

  function reqApproval() {
    if (user?.role?.name == "director") {
      let stageTo = stages.find((el: any) => el.slug == "approved-by-director");
      if (stageTo) {
        setQuote({
          ...quote,
          approvedByDirector: true,
          stage: stageTo,
        });
      } else {
        alert("Erro na mudança de estágio");
      }
    }

    if (user?.role?.name == "sales-leader") {
      let stageTo = stages.find(
        (el: any) => el.slug == "approved-by-coordinator"
      );
      if (stageTo) {
        setQuote({
          ...quote,
          approvedByCoordinator: true,
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
          <DialogTitle>Aprovação de proposta</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <p>Deseja aprovar a proposta?</p>
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
