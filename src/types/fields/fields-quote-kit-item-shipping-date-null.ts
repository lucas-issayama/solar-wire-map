export const fieldsQuoteKitItemsShippingDateNull = [
  {
    name: "id",
    label: "Código",
    type: "string",
    value: "",
    hide: true,
  },
  {
    name: "deleted",
    label: "Removido",
    type: "boolean",
    value: "",
    filter: { eq: false },
    hide: true,
  },
  {
    name: "createdAt",
    label: "Data de criação",
    type: "expirationDate",
    value: "",
    hide: true,
    //filter: { gte: "2025-05-05T03:00:00:000Z" },
    filter: { gt: "2025-05-05T03:00:00.000Z" },
  },
  // {
  //   name: "createdAt",
  //   label: "Data de criação",
  //   type: "datetime",
  //   value: "",
  // },
  // {
  //   name: "createdAt",
  //   label: "Data de validade",
  //   type: "expirationDate",
  //   value: "",
  // },
  {
    name: "quoteKit",
    label: "QuoteKit",
    type: "object-exploded",
    size: 6,
    object: {
      name: "quoteKit",
      singular: "quoteKit",
      plural: "quoteKits",
      label: "Kit",
    },
    value: "",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "string",
        value: null,
        hide: true,
      }, //
      {
        name: "name",
        label: "Nome - kit",
        type: "string",
        value: "",
        hide: true,
      }, //,
      {
        name: "quote",
        label: "Quote",
        type: "object-exploded",
        size: 6,
        object: {
          name: "quote",
          singular: "quote",
          plural: "quotes",
          label: "Pedido",
        },
        value: "",
        fields: [
          {
            name: "orderedAt",
            label: "Data do pedido",
            type: "datetime",
            value: "",
            //hide: true,
            //filter: { gte: "2025-05-05T03:00:00:000Z" },
          },
          {
            name: "id",
            label: "Pedido Id",
            type: "string",
            value: null,
            // hide: true,
          }, //
          {
            name: "name",
            label: "Título",
            type: "string",
            value: "",
          }, //,
          {
            name: "stage",
            label: "Etapa",
            type: "object",
            filter: {
              and: [{ sortNumber: { gte: 100 } }, { sortNumber: { lte: 102 } }],
            },
            size: 6,
            object: {
              name: "stage",
              singular: "stage",
              plural: "stages",
              label: "",
            },
            value: "",
            fields: [
              {
                name: "id",
                label: "Id",
                type: "string",
                value: null,
                hide: true,
              }, //
              {
                name: "name",
                label: "Etapa",
                type: "string",
                value: "",
              }, //,
              // {
              //   name: "sortNumber",
              //   label: "sortNumber",
              //   type: "number",
              //   value: null,
              //   hide: true,

              // },
            ],
          },
        ],
      },
    ],
  },
  { name: "name", label: "Nome", type: "string", value: "" },
  { name: "quantity", label: "Quantidade", type: "number", value: "" },
  // { name: "priceInCents", label: "Preço", type: "price", value: "" },
  // {
  //   name: "integratorServicesInCents",
  //   label: "Repasse",
  //   type: "price",
  //   value: "",
  // },
  // {
  //   name: "enterprise",
  //   label: "Integrador",
  //   type: "object-exploded",
  //   size: 6,
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
  //       value: null,
  //       hide: true,
  //     }, //
  //     {
  //       name: "name",
  //       label: "Integrador",
  //       type: "string",
  //       value: "",
  //     }, //,
  //     {
  //       name: "owner",
  //       label: "Responsável",
  //       type: "object",
  //       size: 6,
  //       object: {
  //         name: "usersPermissionsUser",
  //         singular: "usersPermissionsUser",
  //         plural: "usersPermissionsUsers",
  //         label: "Responsável",
  //       },
  //       value: "",
  //       fields: [
  //         {
  //           name: "id",
  //           label: "Id",
  //           type: "string",
  //           value: null,
  //           hide: true,
  //         }, //
  //         {
  //           name: "name",
  //           label: "Responsável",
  //           type: "string",
  //           value: "",
  //         }, //,
  //       ],
  //     },
  //     {
  //       name: "category",
  //       label: "Categoria",
  //       type: "object",
  //       //hide: true,
  //       object: {
  //         name: "category",
  //         singular: "category",
  //         plural: "categories",
  //         label: "Categoria",
  //       },
  //       value: "",
  //       fields: [
  //         {
  //           name: "id",
  //           label: "Id",
  //           type: "string",
  //           value: "",
  //           hide: true,
  //         }, //
  //         {
  //           name: "name",
  //           label: "Nome",
  //           type: "string",
  //           value: "",
  //         }, //,
  //         {
  //           name: "discount",
  //           label: "Desconto(%)",
  //           type: "number",
  //           value: "",
  //         }, //,
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "stage",
  //   label: "Etapa",
  //   type: "object",
  //   object: {
  //     name: "stage",
  //     singular: "stage",
  //     plural: "stages",
  //     label: "Etapa",
  //     startSort: "sortNumber",
  //   },
  //   size: 6,
  //   value: "",
  //   fields: [
  //     {
  //       name: "name",
  //       label: "Etapa",
  //       type: "string",
  //       value: "",
  //     }, //,
  //   ],
  // },
];
