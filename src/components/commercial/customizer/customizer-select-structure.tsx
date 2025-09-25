import { Card } from "@/components/ui/card";
import { InputQuantity } from "@/components/ui/input-quantity";
import { createQuoteKitItem } from "@/utils/createQuoteKitItem";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
import DialogLayout from "../dialogs/dialog-layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import isTypeStructure from "@/utils/isTypeStructure";
import getItemsFromStructure from "@/utils/getItemsFromStructure";
import getStructureTotalModules from "@/utils/getStructureTotalModules";
import quoteKitItemsUniquePriceId from "@/utils/quoteFunctions/quoteKitItemsUniquePriceId";
export function CustomizerSelectStructure({
  cables,
  length,
  color,
  quoteKit,
  setQuoteKit,
  customDefinition,
  setCustomDefinition,
  structures,
}: any) {
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
    setQuoteKit((prev: any) =>
      quoteKitRecalc({
        ...prev,
        structureName: null,
        quoteKitItems: [
          ...prev.quoteKitItems.filter((el: any) => !isTypeStructure(el.type)),
        ],
      })
    );
  }

  function setQuantity(value: number) {}
  return (
    <Card className="my-6 rounded-lg border-tertiary">
      {/* <p>{JSON.stringify(quoteKit.layoutItems)}</p> */}
      <h1 className="text-xl font-extrabold  bg-primary text-white p-4 ">
        ESTRUTURA
      </h1>

      <Card
        onClick={(ev) => {
          console.log("select");
          deleteSelection();
        }}
        className={`cursor-pointer p-4 pt-5 mt-5 mx-2 ${
          (quoteKit?.structureName ? false : true) ? " border-tertiary" : ""
        }`}
      >
        <p>Nenhum</p>
      </Card>
      {structures?.map((structure: any) => (
        <Card
          key={structure?.name}
          onClick={(ev) => {
            selectItem(structure);
          }}
          className={`cursor-pointer p-4 pt-5 mt-5 mx-2 mb-2 ${
            structure?.name == quoteKit?.structureName
              ? " border-tertiary "
              : ""
          }`}
        >
          <p>{structure?.name}</p>
        </Card>
      ))}

      {quoteKit?.structureName && (
        <Card className="p-4 mt-5 bg-gray-50">
          <div className="flex justify-between  ">
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
        </Card>
      )}

      <DialogLayout
        open={openDialogLayout}
        setOpen={setOpenDialogLayout}
        quoteKit={quoteKit}
        setQuoteKit={setQuoteKit}
      ></DialogLayout>
    </Card>
  );
}
