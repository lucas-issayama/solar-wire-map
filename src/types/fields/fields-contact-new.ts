export const fieldsContactNew = [
  {
    name: "enterprise",
    label: "Integrador",
    type: "object",
    size: 3,
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
        value: "",
        hide: true,
      },
      {
        name: "name",
        label: "Nome",
        type: "string",
        value: "",
      },
    ],
  },
  { name: "name", label: "Nome", type: "string", value: "" },
  { name: "email", label: "Email", type: "string", value: "" },
  {
    name: "city",
    label: "Cidade",
    type: "object",
    object: {
      name: "city",
      singular: "city",
      plural: "cities",
      label: "Cidade",
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
        name: "fullName",
        label: "Cidade",
        type: "string",
        value: "",
      }, //,
    ],
  },
];
