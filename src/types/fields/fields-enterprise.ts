export const fieldsEnterprise = [
  { name: "name", label: "Nome", type: "string", value: "" },
  { name: "cnpj", label: "CNPJ", type: "cnpj", value: "" },
  { name: "ie", label: "I.E.", type: "ie", value: "" },
  {
    name: "city",
    label: "Cidade",
    type: "object",
    hide: true,
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

  {
    name: "category",
    label: "Categoria",
    type: "object",
    hide: true,
    object: {
      name: "category",
      singular: "category",
      plural: "categories",
      label: "Categoria",
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
        name: "name",
        label: "Nome",
        type: "string",
        value: "",
      }, //,
      {
        name: "discount",
        label: "Desconto(%)",
        type: "number",
        value: "",
      }, //,
    ],
  },
  // {
  //   name: "zipCode",
  //   label: "CEP",
  //   type: "cep",
  //   value: "",
  //   size: 6,
  // },
  // {
  //   name: "streetAddress",
  //   label: "Logradouro",
  //   type: "string",
  //   value: "",
  //   size: 8,
  // },
  // {
  //   name: "neighborhood",
  //   label: "Bairro",
  //   type: "string",
  //   value: "",
  //   size: 4,
  // },

  // {
  //   name: "streetAddressLine2",
  //   label: "Complemento",
  //   type: "string",
  //   value: "",
  // },
  // {
  //   name: "streetAddressNumber",
  //   label: "Número",
  //   type: "string",
  //   value: "",
  // },
];
