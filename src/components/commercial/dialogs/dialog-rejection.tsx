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

export default function DialogRejection({
  open,
  setOpen,
  setQuote,
  quote,
  handleClickItem,
}: any) {
  const { stages } = useQuoteProps();
  const { session, isLoading } = useSession();
  const { user } = session;
  function reqRejection() {
    // setQuote({
    //   ...quote,
    //   stage: {
    //     id: 4,
    //     name: "Recusada pelo coordenador",
    //   },
    // });

    if (user?.role?.name == "sales-leader") {
      let stageTo = stages.find(
        (el: any) => el.slug == "rejected-by-coordinator"
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
      let stageTo = stages.find((el: any) => el.slug == "rejected-by-director");
      if (stageTo) {
        setQuote({
          ...quote,
          stage: stageTo,
        });
      } else {
        alert("Erro na mudança de estágio");
      }

      // setQuote({
      //   ...quote,
      //   stage: {
      //     id: 2,
      //     name: "Aguarda aprovação",
      //   },
      // });
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80%] max-h-[90%]  w-[500px]">
        <DialogHeader>
          <DialogTitle>Recusa da proposta</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <p>Deseja recusar a proposta?</p>
          <div className="flex items-stretch justify-between my-10">
            <Button className="bg-red-600" onClick={reqRejection}>
              Sim
            </Button>

            <Button className="" onClick={(el) => setOpen(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
