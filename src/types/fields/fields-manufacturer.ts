export const fieldsManufacturer = [
  {
    name: "id",
    label: "Id",
    type: "string",
    value: "",
    hide: true,
  },
  {
    name: "logo",
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
    name: "name",
    label: "Nome",
    type: "string",
    value: "",
  },
];
