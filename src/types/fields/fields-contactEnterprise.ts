export const fieldsContactEnterprise = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    hide: true,
    editable: false,
  },
  { name: "erpId", label: "SIS Id", type: "string", value: "" },
  // {
  //   name: "enterprise",
  //   label: "Integrador",
  //   type: "object",
  //   size: 3,
  //   hide: true,

  //   object: {
  //     name: "enterprise",
  //     singular: "enterprise",
  //     plural: "enterprises",
  //     label: "Integrador",
  //   },
  //   value: "",
  //   fields: [
  //     {
  //       name: "id",
  //       label: "Id",
  //       type: "string",
  //       value: "",
  //       hide: true,
  //     },
  //     {
  //       name: "name",
  //       label: "Nome",
  //       type: "string",
  //       value: "",
  //     },
  //   ],
  // },
  { name: "name", label: "Nome", type: "string", value: "", default: true },
  {
    name: "email",
    label: "Email",
    type: "string",

    value: "",
    size: 4,
  },
  // { name: "typeId", label: "Tipo", type: "contactType", value: 0 },
  { name: "cnpj", label: "CNPJ", type: "cnpj", value: "" },

  { name: "ie", label: "I.E.", type: "ie", value: "" },
  {
    name: "sintegraContribuinteIcms",
    label: "Contribuinte Icms",
    type: "boolean",
    value: "",
  },
  // { name: "cpf", label: "CPF", type: "cpf", value: "" },
  { name: "phone", label: "Telefone", type: "string", value: "" },
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
  {
    name: "zipCode",
    label: "CEP",
    type: "cep",
    value: "",
    size: 6,
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
