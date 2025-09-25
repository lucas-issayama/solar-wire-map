export function formatSapGetAlternateCatNum(quote: any) {
  let contact: any =
    quote.billingEntity == "contact" ? quote.contact : quote.enterprise;
  let sapRequest: any = {
    method: "GET",
    //url: `/b1s/v1/AlternateCatNum?$filter=contains(Substitute, 'GEF_${quote.id}')`,
    url: `/b1s/v1/AlternateCatNum?$filter=Substitute eq 'GEF_${quote.id}' and CardCode eq '${contact?.sapCode}'`,

    //   {
    //     "method": "GET",
    //    // "url": "/b1s/v1/AlternateCatNum?$filter=contains(Substitute, '41942')"
    //     "url":"/b1s/v1/AlternateCatNum?$filter=Substitute eq 'GEF_41942' and CardCode eq 'C49283'"
    // }
  };

  return sapRequest;
}
