export const fieldsVariable = [
  {
    name: "description",
    label: "Descrição",
    type: "string",
    value: "",
    editable: false,
  },
  { name: "value", label: "Valor", type: "number", value: "" },
  {
    name: "type",
    label: "Unidade",
    type: "variableType",
    value: "",

    editable: false,
  },
  {
    name: "accessLevel",
    label: "Nível de acesso",
    type: "number",
    value: "",
    editable: false,
    hide: true,
    filter: { lte: 0 },
  },
  { name: "max", label: "Máximo", type: "number", value: "", hide: true },
  { name: "min", label: "Mínimo", type: "number", value: "", hide: true },
];
