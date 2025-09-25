import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { sapApi } from "@/utils/sap/sapApi";
import { LoadingIcon } from "@/components/icons/loading";
import useSession from "@/components/session/use-session";

interface DialogSapOrderCancelProps {
  open: boolean;
  setOpen: any;
  sapOrder: any;
  setSapOrder: any;
}

export default function DialogSapOrderCancel({
  open,
  setOpen,
  sapOrder,
  setSapOrder,
}: DialogSapOrderCancelProps) {
  const [canceling, setCanceling] = useState(false);
  const { session, isLoading } = useSession();
  async function sapCancelOrder() {
    setCanceling(true);
    if (sapOrder?.DocEntry) {
      let sapRequest = {
        method: "POST",
        url: `/b1s/v1/Orders(${sapOrder?.DocEntry})/Cancel`,
      };

      //let sapRequest = formatSapGetAlternateCatNum(quote);
      try {
        let ans: any = await sapApi.rawRequest(sapRequest);

        let ansUpdate: any = await corsolarApi.sapOrders.update(
          session?.token,
          {
            id: sapOrder.id,
            Cancelled: "tYES",
          }
        );
        setSapOrder({ ...sapOrder, Cancelled: "tYES" });
        toast({
          title: "",
          description: `Pedido cancelado com sucesso`,
          variant: "success",
        });
        setOpen(false);
      } catch (error: any) {
        toast({
          title: "Erro",
          description: `${error?.message},${JSON.stringify(error?.message)}`,
          variant: "destructive",
        });
      }
    }
    setCanceling(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px] max-w-[80%] max-h-[90%] overflow-scroll  ">
        <DialogHeader>
          <DialogTitle className="">Cancelar pedido SAP</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <p> Tem certeza que deseja cancelar?</p>
          <div className="flex items-stretch justify-between my-10">
            <Button
              className="bg-red-500"
              onClick={sapCancelOrder}
              disabled={canceling}
            >
              {canceling && <LoadingIcon></LoadingIcon>}
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
