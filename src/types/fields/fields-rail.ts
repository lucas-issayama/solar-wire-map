export const fieldsRail = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    size: 2,
    hide: true,
  },

  {
    name: "product",
    label: "Produto",
    type: "object-exploded",
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
        // value: "none",
        filter: {},
        hide: true,
      },
      {
        name: "name",
        label: "Nome do produto",
        type: "string",
        value: "",
        size: 12,
        default: true,
      },

      {
        name: "type",
        label: "Tipo",
        type: "deviceType",
        value: "support",
        filter: { containsi: "rail" },
        editable: false,
        //filter: {},
      },
      {
        name: "erpId",
        label: "SKU",
        type: "string",
        value: "",
      },
    ],
  },
];
