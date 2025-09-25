import { Card } from "@/components/ui/card";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
import DialogLayout from "../dialogs/dialog-layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import isTypeStructure from "@/utils/isTypeStructure";
import getItemsFromStructure from "@/utils/getItemsFromStructure";
import getStructureTotalModules from "@/utils/getStructureTotalModules";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectStructure({ quoteKit, setQuoteKit, structures }: any) {
  const [openDialogLayout, setOpenDialogLayout] = useState(false);
  function selectItem(structure: any) {
    calcAndAddLayoutItems(structure);
  }

  function calcAndAddLayoutItems(structure: any) {
    if (structure) {
      let itemsToAdd = getItemsFromStructure(
        structure,
        quoteKit.layoutItems,
        quoteKit?.quoteKitItems?.find((el: any) => el.type == "module")?.price
          ?.product
      );
      addQuoteKitItems(itemsToAdd, structure);
    }
  }

  function addQuoteKitItems(items: any, structure: any) {
    if (setQuoteKit && quoteKit?.quoteKitItems) {
      setQuoteKit(
        quoteKitRecalc({
          ...quoteKit,
          structureName: structure?.name,
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

  function deleteSelection() {
    // alert("deleteSelection");
    setQuoteKit(
      quoteKitRecalc({
        ...quoteKit,
        structureName: null,
        quoteKitItems: [
          ...quoteKit.quoteKitItems.filter(
            (el: any) => !isTypeStructure(el.type)
          ),
        ],
      })
    );
  }

  function onChange(newValue: any) {
    // setValue(newValue);

    if (newValue == "none") {
      deleteSelection();
    } else {
      //alert(JSON.stringify({ newValue }));
      let structure = structures.find((el: any) => el.name == newValue);
      //alert(JSON.stringify({ structure }));

      calcAndAddLayoutItems(structure);
    }
  }
  return (
    <Card className="my-6 rounded-lg">
      <div className="m-4">
        <p className="font-bold">Configuração de estruturas</p>
      </div>

      <div className="m-4">
        <div className="flex justify-between  ">
          <div className="mx-2 flex justify-start">
            <span className="whitespace-nowrap mx-4">Tipo de cálculo</span>
            <Select
              value={quoteKit?.structureName ?? "none"}
              onValueChange={onChange}
              disabled={false}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolher tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhuma</SelectItem>

                {structures?.map((structure: any) => (
                  <SelectItem key={structure.id} value={structure?.name}>
                    {structure?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {quoteKit?.structureName && (
            <div className="flex justify-end ">
              <span className="mt-2 ml-5">
                Estrutura para <b>{getStructureTotalModules(quoteKit)} </b>
                módulos
              </span>

              <Button
                className="mx-4"
                onClick={(el: any) => {
                  setOpenDialogLayout(true);
                }}
              >
                Editar layout
              </Button>
            </div>
          )}
        </div>
      </div>

      <DialogLayout
        open={openDialogLayout}
        setOpen={setOpenDialogLayout}
        quoteKit={quoteKit}
        setQuoteKit={setQuoteKit}
      ></DialogLayout>
    </Card>
  );
}
