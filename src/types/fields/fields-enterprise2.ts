export const fieldsEnterprise2 = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    hide: true,
    editable: false,
  },
  { name: "erpId", label: "SIS Id", type: "string", value: "" },

  { name: "name", label: "Nome", type: "string", value: "", default: true },
  {
    name: "email",
    label: "Email",
    type: "string",

    value: "",
    size: 4,
  },

  { name: "cnpj", label: "CNPJ", type: "cnpj", value: "" },

  { name: "ie", label: "I.E.", type: "ie", value: "" },
  {
    name: "sintegraContribuinteIcms",
    label: "Contribuinte Icms",
    type: "boolean",
    value: "",
  },

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
];
