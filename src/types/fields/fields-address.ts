import * as z from "zod";

export const fieldsAddress = [
  {
    name: "label",
    label: "Título",
    type: "string",
    value: "",
    size: 6,
    default: true,
  },
  {
    name: "zipCode",
    label: "CEP",
    type: "cep",
    value: "",
    size: 6,
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
        name: "name",
        label: "Cidade",
        type: "string",
        value: "",
      }, //,
      {
        name: "stateShortName",
        label: "Estado",
        type: "string",
        value: "",
      }, //,
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
];
