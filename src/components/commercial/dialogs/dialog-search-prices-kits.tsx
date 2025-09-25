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

import { useState } from "react";
import GraphqlDataView from "../graphql-view/graphql-data-view";
import getValueFromFields from "@/utils/getValueFromFields";
import { schemas } from "@/types/schemas/schemas";

export default function DialogSearchPricesKits({
  open,
  setOpen,
  handleClickItem,
}: any) {
  const [fields, setFields] = useState([
    { name: "id", label: "Id", type: "string", value: "", hide: true },
    {
      name: "enabled",
      label: "Ativo",
      type: "boolean",
      value: true,
      filter: { eq: true },
      hide: true,
    },
    {
      name: "priceList",
      label: "Lista de preço",
      type: "object",
      object: {
        name: "priceList",
        singular: "priceList",
        plural: "priceLists",
        label: "Lista de preço",
      },
      value: "",
      fields: [
        {
          name: "id",
          label: "Id",
          type: "string",
          value: "",
          hide: true,
        }, //

        {
          name: "name",
          label: "Nome lista",
          type: "string",
          value: "",

          //    filter: { gte: "2024-01-01" },
        }, //
        {
          name: "shippingDate",
          label: "Prazo",
          type: "shippingDate",
          value: "",
          //  filter: { gte: "2024-01-01" },
        }, //
        {
          name: "labelText",
          label: "Label",
          type: "string",
          value: "",
          hide: true,
        }, //
        {
          name: "labelColor",
          label: "Cor",
          type: "string",
          value: "",
          hide: true,
        }, //
      ],
    },
    {
      name: "product",
      label: "Produto",
      type: "object-exploded",
      object: {
        name: "product",
        singular: "product",
        plural: "products",
        label: "Produto",
      },
      value: "",
      fields: [
        {
          name: "id",
          label: "Id",
          type: "string",
          value: "",
          hide: true,
        }, //
        {
          name: "type",
          label: "Tipo",
          type: "deviceType",
          editable: false,
          //hide: true,
          value: "kit",
          filter: {
            containsi: "kit",
          },
        }, //,
        {
          name: "name",
          label: "Nome",
          type: "string",
          value: "",
        }, //,
        {
          name: "inverterManufacturer",
          label: "Fabricante Inversor",
          type: "inverterManufacturer",
          value: "",
        },
        {
          name: "acVoltage",
          label: "Tensão da rede",
          type: "acVoltage",
          value: "",
        },
        // {
        //   name: "moduleManufacturer",
        //   label: "Fabricante Módulo",
        //   type: "moduleManufacturer",
        //   value: "",
        // },
        {
          name: "moduleName",
          label: "Modelo Módulo",
          type: "moduleName",
          value: "",
          size: 8,
          hide: true,
        },
        {
          name: "structureName",
          label: "Estrutura",
          type: "structureName",
          value: "",
          hideView: true,
        },
        {
          name: "dcPower",
          label: "Potência Dc (kWp)",
          type: "number",
          value: "",
        },
      ],
    },
    {
      name: "valueInCents",
      label: "Preço",
      type: "price",
      value: 0,
      hideFilter: true,
    }, //
  ]);

  const [object, setObject] = useState<any>({
    singular: "price",
    plural: "prices",
    label: "Kits",
    value: {},
  });

  function handleClickItemAndClose(item: any) {
    let priceFilter = { ...getValueFromFields(fields) };

    handleClickItem(
      item,
      priceFilter?.product?.structureName == "none"
        ? null
        : priceFilter.product.structureName
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95%] md:max-w-[1600px] max-h-[90%] overflow-scroll ">
        <DialogHeader>
          <DialogTitle>Buscar</DialogTitle>
        </DialogHeader>
        <GraphqlDataView
          customFields={fields}
          schema={schemas.price}
          handleClickItem={handleClickItemAndClose}
          dontLoadOnOpen={true}
        ></GraphqlDataView>
      </DialogContent>
    </Dialog>
  );
}
