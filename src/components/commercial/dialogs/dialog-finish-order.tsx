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
import DialogItemsNotAvailable from "./dialog-items-not-available";
import { LoadingIcon } from "@/components/icons/loading";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import { quoteIsExpired } from "@/utils/format/quote-is-expired";

export default function DialogFinishOrder({
  open,
  setOpen,
  setQuote,
  quote,
  handleClickItem,
  stages,
}: any) {
  const { session, isLoading } = useSession();
  const { user } = session;
  const [itemsNok, setItemsNok] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [itemsDisabled, setItemsDisabled] = useState<any>([]);

  useEffect(() => {
    setItemsNok([]);
    setItemsDisabled([]);
  }, [open]);

  async function finishOrderWithValidation() {
    if (!checkItemDisabled()) return false;

    setLoading(true);
    let items = await corsolarApi.quotes.getItemsNok(quote, session?.token);
    if (items?.length == 0) {
      // goNextStage();
      // setOpen(false);
      finishOrder();
    } else {
      console.log("items no ok");
      setItemsNok(items);
    }
    setLoading(false);
  }

  async function finishOrder() {
    if (
      quoteIsExpired(quote.createdAt) &&
      getAccessLevelFromRole(user?.role?.type) < 2
    ) {
      toast({
        title: "",
        description: "Prazo da proposta vencido",
        variant: "destructive",
      });
      return false;
    }

    goNextStage();
    setOpen(false);
  }

  function checkItemDisabled() {
    let _itemsDisabled = [];
    let items = quote.quoteKits[0];
    for (let i = 0; i < quote.quoteKits.length; i++) {
      let quoteKit = quote.quoteKits[i];
      for (let j = 0; j < quoteKit?.quoteKitItems?.length; j++) {
        let quoteKitItem = quoteKit?.quoteKitItems[j];
        //console.log(`${quoteKitItem.name}`);

        // if (
        //   (!quoteKitItem?.price?.enabled && !quoteKitItem?.price?.available) ||
        //   !quoteKitItem?.price?.product?.enabled
        // ) {
        //   _itemsDisabled.push(quoteKitItem);
        // } else {
        //   console.log(`quoteKitItem ena bled:${quoteKitItem.name}`);
        // }

        if (
          (quoteKitItem?.price?.enabled || quoteKitItem?.price?.available) &&
          quoteKitItem?.price?.product?.enabled
        ) {
          console.log(`quoteKitItem enabled:${quoteKitItem.name}`);
        } else {
          _itemsDisabled.push(quoteKitItem);
        }
      }
    }

    setItemsDisabled(_itemsDisabled);
    if (_itemsDisabled.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  function goNextStage() {
    let index = stages
      ?.filter?.((el: any) => !el.slug?.includes("canceled"))
      ?.findIndex((el: any) => el.id == quote?.stage?.id);

    let d = new Date();

    if (index < stages?.length) {
      setQuote({
        ...quote,
        orderedAt: d.toISOString(),
        stage: stages?.filter?.((el: any) => !el.slug?.includes("canceled"))[
          index + 1
        ],
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80%] max-h-[90%]  w-[500px]">
        <DialogHeader>
          <DialogTitle>Finalizar pedido</DialogTitle>
        </DialogHeader>

        {!itemsNok?.length && !itemsDisabled?.length && (
          <Card className="p-10">
            <b>Deseja realmente finalizar pedido?</b>
            <p>(Esta ação não poder ser desfeita)</p>
            <div className="flex items-stretch justify-between my-10">
              <Button
                disabled={loading}
                className="bg-green-600"
                onClick={finishOrderWithValidation}
              >
                Sim {loading && <LoadingIcon></LoadingIcon>}
              </Button>

              <Button
                disabled={loading}
                className=""
                onClick={(el) => setOpen(false)}
              >
                Não
              </Button>
            </div>
          </Card>
        )}
        {(itemsNok?.length ? true : false) && (
          <Card className="p-10">
            <b>Ítens não disponiveis</b>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-blue-100">
                <tr className="m-2 border border-gray-300 px-4 py-2 text-left">
                  <th className="p-2">Ítem</th>
                  <th className="p-2">Disponível</th>
                  <th className="p-2">Mínimo</th>
                </tr>
              </thead>
              <tbody className="m-2">
                {itemsNok?.map((el: any) => (
                  <tr
                    className="m-2 border border-gray-300 px-4 py-2 text-left"
                    key={el.id}
                  >
                    <td className="p-2">{el.name}</td>
                    {/* <td className="p-2">
                      {(el.price.initialQuantity ?? 0) -
                        (el.price.reservedQuantity ?? 0)}
                    </td> */}

                    <td className="p-2">{el.price.availableQuantity ?? 0}</td>
                    <td className="p-2">
                      {el.price.minimunQuantityLevel ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-stretch justify-between my-10">
              <span></span>

              {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                <Button className="" onClick={(el) => finishOrder()}>
                  Prosseguir mesmo assim
                </Button>
              )}

              <Button className="" onClick={(el) => setOpen(false)}>
                Fechar
              </Button>
            </div>
          </Card>
        )}

        {(itemsDisabled?.length ? true : false) && (
          <Card className="p-10">
            <b>Ítens não ativos</b>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-blue-100">
                <tr className="m-2 border border-gray-300 px-4 py-2 text-left">
                  <th className="p-2">Código</th>
                  <th className="p-2">Nome</th>
                </tr>
              </thead>
              <tbody className="m-2">
                {itemsDisabled?.map((el: any) => (
                  <tr
                    className="m-2 border border-gray-300 px-4 py-2 text-left"
                    key={el.id}
                  >
                    <td className="p-2">{el.code}</td>
                    <td className="p-2">{el.name}</td>
                    {/* <p>{JSON.stringify(el.price)}</p> */}
                    {/* {el.price?.available && <span>available</span>} */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-stretch justify-between my-10">
              <span></span>

              {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                <Button className="" onClick={(el) => finishOrder()}>
                  Prosseguir mesmo assim
                </Button>
              )}

              <Button className="" onClick={(el) => setOpen(false)}>
                Fechar
              </Button>
            </div>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
