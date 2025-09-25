export const fieldsCoupon = [
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
    default: true,
  },
  {
    name: "email",
    label: "Email",
    type: "Email",
    value: "",
  },
  {
    name: "enterprise",
    label: "Integrador",
    type: "object",
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
    ],
  },
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
