import { useRouter } from "next/navigation";
import { Quote, QuoteItem, QuoteKit } from "@/types/quote";
import useSession from "@/components/session/use-session";

import { ResponsiveModal } from "@/components/ui/responsive-modal";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputQuantity } from "@/components/ui/input-quantity";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@/components/icons/delete-icon";
//import { evaluate } from "mathjs";
import { Parser as FormulaParser } from "hot-formula-parser";
import { useProductFilter } from "@/hooks/useProductFilter";
import { v4 as uuidv4 } from "uuid";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
import isTypeStructure from "@/utils/isTypeStructure";
import getQuoteKitNModules from "@/utils/getQuoteKitNModules";
import { LayoutItem, Structure } from "@/types/structure";
import evaluateLayoutFormula from "@/utils/evaluateLayoutFormula";
import getItemsFromStructure from "@/utils/getItemsFromStructure";
import getStructureTotalModules from "@/utils/getStructureTotalModules";
import CardPrimary from "@/components/ui/card-primary";

interface DialogLayoutCardProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setQuote?: (value: Quote) => void;
  setQuoteKit: (value: QuoteKit) => void;
  quote?: Quote;
  quoteKit: QuoteKit;
}

export default function DialogLayout({
  open,
  setOpen,
  setQuote,
  setQuoteKit,
  quote,
  quoteKit,
}: DialogLayoutCardProps) {
  const { structures } = useProductFilter();
  useEffect(() => {
    if (
      open &&
      getQuoteKitNModules(quoteKit) &&
      !quoteKit?.layoutItems?.length
    ) {
      setQuoteKit({
        ...quoteKit,
        layoutItems: [
          {
            id: 0,
            direction: "vertical",
            rows: 1,
            columns: getQuoteKitNModules(quoteKit),
          },
        ],
      });
    }
  }, [quoteKit, open]);

  let structure = structures?.find((el) => el.name == quoteKit?.structureName);

  function setRows(selLayoutItem: LayoutItem, value: number) {
    setQuoteKit({
      ...quoteKit,
      layoutItems: quoteKit?.layoutItems.map((el: any) => ({
        ...el,
        rows: el.id == selLayoutItem.id ? value : el.rows,
      })),
    });
  }

  function setColumns(selLayoutItem: LayoutItem, value: number) {
    setQuoteKit({
      ...quoteKit,
      layoutItems: quoteKit?.layoutItems.map((el: any) => ({
        ...el,
        columns: el.id == selLayoutItem.id ? value : el.columns,
      })),
    });
  }

  function setDirection(selLayoutItem: LayoutItem, value: string) {
    setQuoteKit({
      ...quoteKit,
      layoutItems: quoteKit?.layoutItems.map((el: any) => ({
        ...el,
        direction: el.id == selLayoutItem.id ? value : el.direction,
      })),
    });
  }

  function addLayoutItem() {
    let greaterId = 0;

    let sortedLayout = quoteKit?.layoutItems.sort(
      (a: any, b: any) => a?.id - b?.id
    );
    if (sortedLayout.length)
      greaterId = sortedLayout[sortedLayout.length - 1]?.id ?? 0;

    setQuoteKit({
      ...quoteKit,
      layoutItems: [
        ...quoteKit?.layoutItems,
        { id: greaterId + 1, direction: "vertical", rows: 1, columns: 1 },
      ],
    });
  }

  function deleteItem(idToDelete: number) {
    setQuoteKit({
      ...quoteKit,
      layoutItems: quoteKit?.layoutItems.filter((el) => el.id !== idToDelete),
    });
  }

  function calcAndAddLayoutItems() {
    if (structure) {
      let itemsToAdd = getItemsFromStructure(
        structure,
        quoteKit?.layoutItems,
        quoteKit?.quoteKitItems?.find((el: any) => el.type == "module")?.price
          ?.product
      );
      addQuoteKitItems(itemsToAdd);
      setOpen(false);
    }
  }

  //Remove old structure items

  function addQuoteKitItems(items: any) {
    if (setQuoteKit && quoteKit?.quoteKitItems) {
      setQuoteKit(
        quoteKitRecalc({
          ...quoteKit,
          //layoutItems,
          quoteKitItems: [
            ...quoteKit?.quoteKitItems?.map((el: any) => ({
              ...el,
              deleted: isTypeStructure(el.type) ? true : el.deleted,
            })),
            ...items,
          ],
        })
      );
    }
  }

  return (
    quoteKit && (
      <ResponsiveModal
        open={open}
        onOpenChange={setOpen}
        title="Layout dos módulos"
        className="max-w-[95%] sm:max-w-[80%] lg:max-w-[1000px] m-0 p-2 sm:p-4"
      >
        {structure && (
          <CardPrimary title="LAYOUT DOS MÓDULOS" className="">
            <p className="font-bold text-primary">
              ESTRUTURA {structure?.name?.toUpperCase()} PARA{" "}
              {getStructureTotalModules(quoteKit)} MÓDULOS
            </p>
            {getStructureTotalModules(quoteKit) !==
              getQuoteKitNModules(quoteKit) && (
              <p className="text-red-600">{`Kit contém ${getQuoteKitNModules(
                quoteKit
              )} módulos`}</p>
            )}

            <br></br>
            {quoteKit?.layoutItems?.map((layoutItem, index) => (
              <div key={index}>
                <hr className="block md:hidden my-2"></hr>
                <div className="grid grid-cols-12 gap-4 mx-2">
                  <div className="flex items-center col-span-12  md:col-span-4 justify-between">
                    <p className="font-bold text-primary text-md">
                      Número de linhas
                    </p>
                    <div>
                      <InputQuantity
                        value={layoutItem.rows}
                        setValue={(value) => {
                          setRows(layoutItem, value);
                        }}
                      ></InputQuantity>
                    </div>
                  </div>
                  <div className="flex items-center col-span-12  md:col-span-4 justify-between ">
                    <p className="font-bold text-primary text-md">
                      Número de módulo
                    </p>
                    <div>
                      <InputQuantity
                        value={layoutItem.columns}
                        setValue={(value) => {
                          setColumns(layoutItem, value);
                        }}
                      ></InputQuantity>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-3 mb-3 ">
                    <p>Orientação</p>
                    <Select
                      value={layoutItem.direction ?? ""}
                      onValueChange={(value) => {
                        setDirection(layoutItem, value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolher direção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vertical">Vertical</SelectItem>
                        <SelectItem value="horizontal">Horizontal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1 justify-items-end  flex justify-end">
                    <br />
                    <button
                      onClick={(ev) => deleteItem(layoutItem.id)}
                      aria-label="Deletar"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <br></br>
            <div className="col-span-3 justify-items-end  flex justify-center">
              <Button
                className="bg-tertiary"
                onClick={(el) => {
                  addLayoutItem();
                }}
              >
                NOVO ARRANJO +
              </Button>
            </div>
            <br></br>
            <hr className="my-4"></hr>
            {getStructureTotalModules(quoteKit) ==
              getQuoteKitNModules(quoteKit) && (
              <div className="col-span-3 justify-items-end  flex justify-end">
                <Button
                  onClick={(el) => {
                    calcAndAddLayoutItems();
                  }}
                >
                  SALVAR E RECALCULAR ESTRUTURAS
                </Button>
              </div>
            )}

            {getStructureTotalModules(quoteKit) !==
              getQuoteKitNModules(quoteKit) && (
              <p className="text-red-600">
                Quantidade de módulos do kit e da estrutura diferentes{" "}
              </p>
            )}
          </CardPrimary>
        )}
        {!structure && <Card className="p-10">...Carregando estruturas</Card>}
      </ResponsiveModal>
    )
  );
}
