export const fieldsPriceList = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    hide: true,
  },
  {
    name: "tag",
    label: "Image",
    type: "object-image",
    object: {
      name: "image",
      singular: "image",
      plural: "images",
      label: "Imagem",
    },
    value: "",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "number",
        value: null,
        hide: true,
      },

      {
        name: "url",
        label: "Imagem",
        type: "image",
        value: "",
      },
    ],
  },
  {
    name: "enabled",
    label: "Ativa",
    type: "boolean",
    value: true,
    filter: { eq: true },
  },
  {
    name: "enabledOnKits",
    label: "Ativa nos kits",
    type: "boolean",
    value: true,
    filter: { eq: true },
  },
  {
    name: "name",
    label: "Nome",
    type: "string",
    value: "",
  },

  {
    name: "shippingDate",
    label: "Data de entrega",
    type: "shippingDate",
    value: "",
  },
];
