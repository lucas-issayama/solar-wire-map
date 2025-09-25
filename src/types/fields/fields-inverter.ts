export const fieldsInverter = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    hide: true,
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
    name: "manufacturer_name",
    label: "Fabricante",
    type: "string",
    value: "",
    size: 4,
  },

  {
    name: "inverter_type",
    label: "Tipo",
    type: "inverterType",
    value: "",
    size: 4,
  },
  // {
  //   name: "erpId",
  //   label: "SKU Base",
  //   type: "string",
  //   value: "",
  // },

  {
    name: "ac_power",
    label: "Potência Ac(kW)",
    type: "number",
    value: "",
    editable: false,
  },
  {
    name: "ac_phases",
    label: "Fases Ac",
    type: "number",
    value: "",
    editable: false,
  },
  {
    name: "ac_voltage",
    label: "Tensão Ac (V)",
    type: "number",
    value: "",
    editable: false,
  },

  {
    name: "dc_min_power",
    label: "Potência mínima Dc (kWp)",
    type: "number",
    value: "",
    editable: false,
  },
  {
    name: "dc_max_power",
    label: "Potência máxima Dc (kWp)",
    type: "number",
    value: "",
    editable: false,
  },

  {
    name: "mppts",
    label: "Mppts",
    type: "mppts",
    value: "",
    size: 12,
    editable: false,
  },
];
