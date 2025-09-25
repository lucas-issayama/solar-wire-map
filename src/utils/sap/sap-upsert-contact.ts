import { sapApi } from "./sapApi";
import { sapMergeAddresses } from "./sap-merge-addresses";
import { sapMergeContactEmployees } from "./sap-merge-contact-employees";

export async function sapUpsertContact(sapContact: any, selContact: any) {
  let sapCode: any;
  sapCode = selContact?.sapCode;

  if (sapContact) {
    let test = false;
    let ansSapContacts: any;

    ansSapContacts = await sapApi.getContactByDoc(
      sapContact.U_UPPTaxId,
      sapContact?.CardType ?? "cCustomer",
      selContact.cpf ? true : false
    );

    if (ansSapContacts?.length > 0) {
      let ansSapContact = ansSapContacts[0];
      sapCode = ansSapContact.CardCode;
      let BPAddresses = sapMergeAddresses(sapCode, sapContact, ansSapContact);

      let ContactEmployees = sapMergeContactEmployees(
        sapCode,
        sapContact,
        ansSapContact
      );

      let dataToUpdate: any = {};

      if (ansSapContact?.SalesPersonCode == 1273) {
        //Ecommerce - permite update
        dataToUpdate = {
          method: "PATCH",
          requestId: sapContact.requestId,
          url: `${sapContact.url}('${sapCode}')`,
          CardName: sapContact.CardName,
          BPAddresses,
          U_UPPTaxId: sapContact.U_UPPTaxId,
          U_TX_IndIEDest: sapContact?.U_TX_IndIEDest,
          U_UPTxIdIE: sapContact?.U_UPTxIdIE,
          U_TX_IndFinal: sapContact.U_TX_IndFinal,
          AliasName: sapContact?.AliasName,
          Phone1: sapContact.Phone1,
          Phone2: sapContact.Phone2,
          EmailAddress: sapContact.EmailAddress,
          BPPaymentMethods: sapContact.BPPaymentMethods,
          BPBranchAssignment: sapContact.BPBranchAssignment?.map((el: any) => ({
            ...el,
            BPCode: sapCode,
          })),
          ContactEmployees,
          BPFiscalTaxIDCollection: sapContact.BPFiscalTaxIDCollection?.map(
            (el: any) => ({ ...el, BPCode: sapCode })
          ),
        };

        let keysToUpdate = [
          "City",
          "County",
          "Block",
          "BillToState",
          "ShipToState",
          "Address",
          "ZipCode",
          "MailAddress",
          "MailZipCode",
          "MailCity",
          "MailCounty",
        ];
        for (let i = 0; i < keysToUpdate.length; i++) {
          let key = keysToUpdate[i];
          if (sapContact[key]) {
            dataToUpdate[key] = sapContact[key];
          }
        }
      } else {
        dataToUpdate = {
          method: "PATCH",
          requestId: sapContact.requestId,
          url: `${sapContact.url}('${sapCode}')`,
          BPAddresses,
          // BPFiscalTaxIDCollection: sapContact.BPFiscalTaxIDCollection,
          BPFiscalTaxIDCollection: sapContact.BPFiscalTaxIDCollection?.map(
            (el: any) => ({ ...el, BPCode: sapCode })
          ),
        };
      }

      let ansUpdate = await sapApi.updateContact(dataToUpdate);
    } else {
      let ansCreate = await sapApi.createContact(sapContact);
      sapCode = ansCreate?.CardCode;
    }

    return sapCode;
    //get sap
  }
}
