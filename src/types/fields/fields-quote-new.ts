export const fieldsQuoteNew = [
  { name: "name", label: "Nome", type: "string", value: "", size: 6 },
  {
    name: "enterprise",
    label: "Integrador",
    type: "object",
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
      },
      {
        name: "name",
        label: "Nome",
        type: "string",
        value: "",
      },
      {
        name: "cnpj",
        label: "CNPJ",
        type: "string",
        value: "",
      },
    ],
  },
  {
    name: "contact",
    label: "Cliente",
    type: "object",
    size: 6,

    object: {
      name: "contact",
      singular: "contact",
      plural: "contacts",
      label: "Cliente",
    },
    value: "",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "string",
        value: null,
      }, //
      {
        name: "name",
        label: "Nome",
        type: "string",
        value: "",
      }, //,
    ],
  },
];
