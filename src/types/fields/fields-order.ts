export const fieldsOrder = [
  {
    name: "id",
    label: "Código",
    type: "string",
    value: "",
  },

  {
    name: "creator",
    label: "Criador",
    type: "object",
    size: 6,
    object: {
      name: "usersPermissionsUser",
      singular: "usersPermissionsUser",
      plural: "usersPermissionsUsers",
      label: "Criador",
    },
    value: "",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "string",
        value: null,
        hide: true,
      }, //
      {
        name: "name",
        label: "Criador",
        type: "string",
        value: "",
      }, //,
    ],
  },
  { name: "name", label: "Título", type: "string", value: "" },
  {
    name: "orderedAt",
    label: "Data do pedido",
    type: "datetime",
    value: "",
  },
  {
    name: "invoicedAt",
    label: "Data do faturamento",
    type: "date",
    value: "",
  },
  { name: "dcPower", label: "Potência (kWp)", type: "number", value: "" },
  { name: "priceInCents", label: "Preço total", type: "price", value: "" },
  {
    name: "integratorServicesInCents",
    label: "Repasse",
    type: "price",
    value: "",
  },
  /*   {
    name: "priceKitsFinalInCents",
    label: "Preço kit",
    type: "price",
    value: "",
  }, */
  {
    name: "enterprise",
    label: "Integrador",
    type: "object-exploded",
    size: 6,
    object: {
      name: "enterprise",
      singular: "enterprise",
      plural: "enterprises",
      label: "Integrador",
    },
    value: "",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "string",
        value: null,
        hide: true,
      }, //
      {
        name: "name",
        label: "Integrador",
        type: "string",
        value: "",
      }, //,
      {
        name: "owner",
        label: "Responsável",
        type: "object",
        size: 6,
        object: {
          name: "usersPermissionsUser",
          singular: "usersPermissionsUser",
          plural: "usersPermissionsUsers",
          label: "Responsável",
        },
        value: "",
        fields: [
          {
            name: "id",
            label: "Id",
            type: "string",
            value: null,
            hide: true,
          }, //
          {
            name: "name",
            label: "Responsável",
            type: "string",
            value: "",
          }, //,
        ],
      },
    ],
  },
  {
    name: "stage",
    label: "Etapa",
    type: "object",
    object: {
      name: "stage",
      singular: "stage",
      plural: "stages",
      label: "Etapa",
      startSort: "sortNumber",
    },
    size: 6,
    value: "",
    fields: [
      {
        name: "name",
        label: "Etapa",
        type: "string",
        value: "",
      }, //.,
    ],
  },
  {
    name: "shippingDate",
    label: "Prazo de entrega",
    type: "shippingDate",
    value: "",
  },
];
