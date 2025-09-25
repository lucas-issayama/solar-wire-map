export const fieldsPrice2 = [
  // {
  //   name: "createdAt",
  //   label: "Data de criação",
  //   type: "datetime",
  //   value: "",
  // },
  { name: "id", label: "Id", type: "string", value: "", hide: true },
  {
    name: "enabled",
    label: "Ativo",
    type: "boolean",
    value: true,
    filter: { eq: true },
    hide: true,
  },
  { name: "sku", label: "SKU", type: "string", value: "" },
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
        name: "enabled",
        label: "Ativo",
        type: "boolean",
        value: true,
        filter: { eq: true },
        hide: true,
      },
      {
        name: "type",
        label: "Tipo",
        type: "deviceTypeProduct",
        // value: "module",
        value: "",
        filter: {},
        // filter: {
        //   containsi: "module",
        // },
        hide: false,
      }, //,

      {
        name: "name",
        label: "Nome",
        type: "string",
        value: "",
      }, //,

      {
        name: "manufacturerName",
        label: "Fabricante",
        type: "string",
        value: "",
      }, //,
      {
        name: "code",
        label: "Código",
        type: "string",
        value: "",
      }, //,
      {
        name: "acPower",
        label: "Potência Ac (kW)",
        type: "number",
        value: "",
        productTypes: "inverter",
      }, //,
      {
        name: "dcPower",
        label: "Potência Dc (Wp)",
        type: "dcPowerWp",
        value: "",
        productTypes: "module",
      }, //,

      // {
      //   name: "erpId",
      //   label: "SKU",
      //   type: "string",
      //   value: "",
      // }, //,

      // {
      //   name: "cost",
      //   label: "Custo (R$)",
      //   type: "number",
      //   value: "",
      // }, //,
      // {
      //   name: "costInCents",
      //   label: "Custo (R$)",
      //   type: "price",
      //   value: "",
      // }, //,
    ],
  },
  {
    name: "costInCents",
    label: "Custo (R$)",
    type: "price",
    hide: true,
    value: "",
  }, //,
  {
    name: "valueInCents",
    label: "Preço",
    type: "price",
    value: 0,
  }, //

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
        label: "Nome",
        type: "string",
        value: "",
        hide: false,
      }, //
      {
        name: "shippingDate",
        label: "Prazo",
        type: "shippingDate",
        value: "",
        filter: { gte: "2024-01-01" },
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
];
