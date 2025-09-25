export const fieldsContact2 = [
  { name: "name", label: "Nome", type: "string", value: "" },
  { name: "email", label: "Email", type: "string", value: "" },
  {
    name: "city",
    label: "Cidade",
    type: "object",
    size: 6,
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
