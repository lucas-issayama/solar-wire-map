export const fieldsProduct = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    hide: true,
  },
  {
    name: "image",
    label: "Image",
    type: "object-image",
    object: {
      name: "image",
      singular: "image",
      plural: "images",
      label: "Imagem",
    },
    value: "",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "number",
        value: null,
        hide: true,
      },

      {
        name: "url",
        label: "Imagem",
        type: "image",
        value: "",
      },
    ],
  },
  {
    name: "erpId",
    label: "SKU Base",
    type: "string",
    value: "",
  },
  {
    name: "sapCode",
    label: "SAP Code",
    type: "string",
    value: "",
  },

  {
    name: "label",
    label: "Título no filtro",
    type: "string",
    value: "",
  },

  {
    name: "type",
    label: "Tipo",
    type: "deviceType",
    value: "",
    //filter: { containsi: "module" },
    filter: {},
  },
  {
    name: "code",
    label: "Código",
    type: "string",
    value: "",
    size: 4,
  },
  {
    name: "name",
    label: "Nome",
    type: "string",
    value: "",
    size: 4,
  },

  {
    name: "manufacturerName",
    label: "Fabricante",
    type: "string",
    value: "",
  },

  {
    name: "stockQuantity",
    label: "Quantidade no estoque",
    type: "number",
    value: "",
    editable: false,
  },
  {
    name: "unit",
    label: "Unidade",
    type: "string",
    value: "",
  },
  {
    name: "costInCents",
    label: "Custo",
    type: "price",
    value: "",
    editable: true,
  },
  {
    name: "enabled",
    label: "Ativo",
    type: "boolean",
    value: "",
    // editable: true,
  },
  {
    name: "enabledOnKits",
    label: "Ativo nos kits",
    type: "boolean",
    value: "",
    //editable: false,
  },
  {
    name: "weight",
    label: "Peso (kg)",
    type: "number",
    value: "",
  },

  {
    name: "height",
    label: "Altura (mm)",
    type: "number",
    value: "",
  },

  {
    name: "width",
    label: "Largura (mm)",
    type: "number",
    value: "",
  },

  {
    name: "depth",
    label: "Profundidade (mm)",
    type: "number",
    value: "",
  },

  {
    name: "length",
    label: "Comprimento (mm)",
    type: "number",
    value: "",
  },
  {
    name: "nModules",
    label: "Número de módulos",
    type: "number",
    value: "",
  },
  {
    name: "dcPower",
    label: "Potência Dc(kWp)",
    type: "number",
    value: "",
    //editable: false,
  },

  {
    name: "acPower",
    label: "Potência Ac(kW)",
    type: "number",
    value: "",
    //  editable: false,
  },
  {
    name: "nInputs",
    label: "Nº de Entradas",
    type: "number",
    value: "",
    //editable: false,
  },
  {
    name: "nOutputs",
    label: "Nº de Saídas",
    type: "number",
    value: "",
    //  editable: false,
  },

  {
    name: "dcMaxVoltage",
    label: "Tensão máxima (V)",
    type: "number",
    value: "",
    //   editable: false,
  },
  // {
  //   name: "accessLevel",
  //   label: "Nível de acesso",
  //   type: "accessLevel",
  //   value: "",
  //   hide: true,
  // },
];
