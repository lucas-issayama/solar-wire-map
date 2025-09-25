export const fieldsPriceEdit = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    size: 2,
    hide: true,
  },

  {
    name: "enabled",
    label: "Ativo",
    type: "boolean",
    value: true,
    filter: { eq: true },
    size: 1,
    hide: true,
  },
  {
    name: "accessLevel",
    label: "Nível de acesso",
    type: "accessLevel",
    value: "",
  },

  {
    name: "product",
    label: "Produto",
    type: "object",
    size: 12,
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
        type: "number",
        value: "",
        hide: true,
      },
      {
        name: "name",
        label: "Nome do produto",
        type: "string",
        value: "",
      },
      {
        name: "type",
        label: "Tipo",
        type: "string",
        value: "module",
        filter: { containsi: "module" },
      },

      {
        name: "module",
        label: "Módulo",
        type: "object-exploded",
        value: "",
        fields: [
          {
            name: "name",
            label: "Nome do módulo",
            type: "string",
            value: "",
          },
        ],
      },
    ],
  },
  {
    name: "valueInCents",
    label: "Preço",
    type: "price",
    value: "",
  },

  {
    name: "priceList",
    label: "Lista de preço",
    type: "object",
    size: 4,
    object: {
      name: "priceList",
      singular: "priceList",
      plural: "priceLists",
      label: "Prazo",
    },
    value: "",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "string",

        value: "",
      },
      {
        name: "name",
        label: "Nome",
        type: "string",
        value: "",
      },
      {
        name: "shippingDate",
        label: "Prazo de entrega",
        type: "shippingDate",
        value: "",
      },
    ],
  },
  {
    name: "initialQuantity",
    label: "Quantidade estoque inicial",
    type: "integer",
    value: "",
  },
  {
    name: "reservedQuantity",
    label: "Quantidade reservada",
    type: "integer",
    value: "",
    editable: false,
  },
  {
    name: "minimunQuantityLevel",
    label: "Quantidade mínima estoque",
    type: "integer",
    value: "",
  },
  {
    name: "isQuantityControlled",
    label: "Ativar controle de estoque",
    type: "boolean",
    value: "",
  },
];
