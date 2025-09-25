export const fieldsShippingAddress = [
  {
    name: "label",
    label: "Título",
    type: "string",
    value: "",
    size: 6,
    default: true,
  },
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
      {
        name: "stateShortName",
        label: "Estado",
        type: "string",
        value: "",
        hide: true,
      }, //

      {
        name: "name",
        label: "Cidade",
        type: "string",
        value: "",
        hide: true,
      }, //
    ],
  },
  {
    name: "streetAddress",
    label: "Logradouro",
    type: "string",
    value: "",
    size: 8,
  },
  {
    name: "neighborhood",
    label: "Bairro",
    type: "string",
    value: "",
    size: 4,
  },

  {
    name: "streetAddressLine2",
    label: "Complemento",
    type: "string",
    value: "",
  },
  {
    name: "streetAddressNumber",
    label: "Número",
    type: "string",
    value: "",
  },
  { name: "zipCode", label: "CEP", type: "cep", value: "" },

  { name: "customerName", label: "Recebedor nome", type: "string", value: "" },
  {
    name: "customerEmail",
    label: "Recebedor email",
    type: "string",
    value: "",
  },
  {
    name: "customerPhone",
    label: "Recebedor telefone",
    type: "string",
    value: "",
  },
];
