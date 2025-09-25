export const fieldsEnterpriseEdit = [
  { name: "name", label: "Nome", type: "string", value: "", size: 6 },
  { name: "cnpj", label: "CNPJ", type: "cnpj", value: "" },
  { name: "ie", label: "I.E.", type: "ie", value: "" },
  { name: "email", label: "E-mail", type: "string", value: "", size: 6 },
  { name: "phone", label: "Telefone", type: "string", value: "" },
  {
    name: "commercialActive",
    label: "Ativo",
    type: "boolean",
    value: "",
    editable: false,
  },
  {
    name: "wasCommercialActiveLastMonth",
    label: "Ativo (mês passado)",
    type: "boolean",
    value: "",
    editable: false,
  },
  {
    name: "owner",
    label: "Responsável",
    type: "object",
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
      }, //
      {
        name: "name",
        label: "Nome",
        type: "string",
        value: "",
      }, //,
      {
        name: "email",
        label: "Email",
        type: "string",
        value: "",
      }, //,
      // {
      //   name: "phone",
      //   label: "Telefone",
      //   type: "phone",
      //   value: "",
      // },
    ],
  },
  {
    name: "category",
    label: "Categoria",
    type: "object",
    size: 4,
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
  {
    name: "city",
    label: "Cidade",
    type: "object",
    size: 4,
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
