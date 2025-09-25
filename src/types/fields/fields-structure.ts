export const fieldsStructure = [
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
  {
    name: "manufacturerName",
    label: "Fabricante",
    type: "string",
    value: "",
  },

  {
    name: "structureType",
    label: "Tipo de estrutura",
    type: "string",
    value: "",
    //filter: { containsi: "module" },
    filter: {},
  },

  {
    name: "calcMethod",
    label: "Tipo de cálculo",
    type: "calcMethod",
    value: "",
    //filter: { containsi: "module" },
    filter: {},
  },

  {
    name: "active",
    label: "Ativo",
    type: "boolean",
    value: "",
    editable: true,
  },
];
