import { extrairPrefixoLogradouro } from "@/utils/format/extrair-prefixo-logradouro";
import { getDddFromPhone } from "../get-ddd-from-phone";
import { getIndFinal } from "../get-ind-final";
import { getIndIeDest } from "../get-ind-ie-dest";
import { getOnlyPhone } from "../get-only-phone";
import { extrairTextoLogradouro } from "@/utils/format/extrair-texto-logradouro";
import { formatCNPJ } from "@/utils/format/format-cnpj";

export function formatSapContactEnterprise(
  contact: any,
  invoiceAddress: any,
  shippingAddress: any,
  creator: any,
  quote: any
) {
  console.log(`cpf:${contact.cpf}`);
  console.log(`cnpj:${contact.cnpj}`);

  let sapContact: any = {
    method: "POST",
    requestId: contact.id,
    url: "/b1s/v1/BusinessPartners",
    CardName: contact.name,
    CardType: "cCustomer",
    U_TX_IndIEDest: getIndIeDest(contact),
    U_TX_IndFinal: getIndFinal(contact),
    // Address: invoiceAddress?.streetAddress,
    //U_UPPTaxId: contact.cpf ?? contact.cnpj,
    U_UPPTaxId: contact.cpf && contact.cpf !== "" ? contact.cpf : contact.cnpj,
    U_UPTxIdIE: contact.ie && contact.ie !== "" ? contact.ie : "Isento",

    GroupCode: 100,

    Phone1: getOnlyPhone(contact.phone) ?? "1999-1999",
    Phone2: getDddFromPhone(contact.phone) ?? "19",

    PayTermsGrpCode: -2,
    // CreditLimit: 0.0,
    // DiscountPercent: 0.0,
    VatLiable: "vLiable",
    //FederalTaxID: null,
    //SalesPersonCode: -1,
    SalesPersonCode: 1273,
    Currency: "R$",
    Country: "BR",
    EmailAddress: contact?.email,
    DefaultBankCode: "-1",
    Valid: "tYES",
    //PeymentMethodCode: "CR_01",
    HouseBankCountry: "BR",
    CompanyPrivate: "cCompany",
    //!!
    OperationCode347: "ocSalesOrServicesRevenues",
    InsuranceOperation347: "tNO",
    HierarchicalDeduction: "tNO",
    ShaamGroup: "sgServicesAndAsset",
    WithholdingTaxCertified: "tNO",
    BookkeepingCertified: "tNO",
    Affiliate: "tNO",
    DatevFirstDataEntry: "tYES",
    UseShippedGoodsAccount: "tYES",

    Series: 70, //!important

    OwnerCode: null,
    //OwnerCode: 63,

    BlockSendingMarketingContent: "tNO",

    //U_UPTipoPN: 1,

    ElectronicProtocols: [],
    ContactEmployees: [],
    BPPaymentMethods: [
      {
        PaymentMethodCode: "CR_01", //BOLETO BANCÁRIO
        RowNumber: 0,
      },
      {
        PaymentMethodCode: "CR_02", //TRANSFERÊNCIA BANCÁRIA
        RowNumber: 1,
      },
      {
        PaymentMethodCode: "CR_03", // CARTÃO DE CRÉDITO
        RowNumber: 2,
      },
    ],
    BPBranchAssignment: [
      {
        // "BPCode": "C48515",
        BPLID: 1,
        DisabledForBP: "tNO",
      },
      {
        BPLID: 3,
        DisabledForBP: "tNO",
      },
      {
        BPLID: 4,
        DisabledForBP: "tNO",
      },
      {
        BPLID: 5,
        DisabledForBP: "tNO",
      },
      {
        BPLID: 6,
        DisabledForBP: "tNO",
      },
      {
        BPLID: 7,
        DisabledForBP: "tNO",
      },
      {
        BPLID: 8,
        DisabledForBP: "tNO",
      },
    ],
    BPWithholdingTaxCollection: [],
    BPPaymentDates: [],
    BPBankAccounts: [],
    DiscountGroups: [],
    BPIntrastatExtension: {},
    BPBlockSendingMarketingContents: [],
    BPCurrenciesCollection: [],

    ShipToDefault: `Entrega_1`,
    BilltoDefault: `Cobranca_1`,

    BPAddresses: [
      {
        AddressType: "bo_BillTo",
        AddressName: "Cobranca_1",

        Block: contact?.neighborhood,
        ZipCode: contact?.zipCode?.replace(/\D+/g, ""),
        City: contact?.city?.name,
        County: contact?.city.sapCounty ?? "4888",
        Country: "BR",
        State: contact?.city.stateShortName ?? "SP",
        StreetNo: contact?.streetAddressNumber ?? "S/N",
        BuildingFloorRoom: "",
        // TypeOfAddress: "RUA",
        // Street: contact?.streetAddress,
        TypeOfAddress:
          extrairPrefixoLogradouro(contact?.streetAddress) ?? "RUA",
        Street: extrairTextoLogradouro(contact?.streetAddress),
        //RowNum: 0,
        TaasEnabled: "tYES",

        U_TX_IE: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        U_CCIncentivoFiscal: contact.cnpj ? formatCNPJ(contact.cnpj) : null,
        U_TX_IndIEDest: getIndIeDest(contact),
        U_TX_IndFinal: getIndFinal(contact),
      },
      {
        AddressType: "bo_ShipTo",
        AddressName: "Entrega_1",
        Block: contact?.neighborhood,
        ZipCode: contact?.zipCode?.replace(/\D+/g, ""),
        City: contact?.city?.name,
        County: contact?.city.sapCounty ?? "4888",
        Country: "BR",
        State: contact?.city.stateShortName ?? "SP",
        StreetNo: contact?.streetAddressNumber ?? "S/N",
        BuildingFloorRoom: "",
        // TypeOfAddress: "RUA",
        // Street: contact?.streetAddress,
        TypeOfAddress:
          extrairPrefixoLogradouro(contact?.streetAddress) ?? "RUA",
        Street: extrairTextoLogradouro(contact?.streetAddress),
        //RowNum: 1,
        TaasEnabled: "tYES",
        U_TX_IE: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        U_CCIncentivoFiscal: contact.cnpj ? formatCNPJ(contact.cnpj) : null,
        U_TX_IndIEDest: getIndIeDest(contact),
        U_TX_IndFinal: getIndFinal(contact),
      },
    ],
  };

  if (contact.cnpj) {
    sapContact.BPFiscalTaxIDCollection = [
      {
        Address: `Entrega_1`,
        TaxId0: formatCNPJ(contact.cnpj),
        TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        AddrType: "bo_ShipTo",
        AToRetrNFe: "tNO",
      },
      {
        Address: `Cobranca_1`,
        TaxId0: formatCNPJ(contact.cnpj),
        TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        AddrType: "bo_BillTo",
        AToRetrNFe: "tNO",
      },
    ];
  }

  let owner = quote?.enterprise?.owner;
  if (owner) {
    sapContact.ContactEmployees = [
      {
        Name: owner.name,
        E_Mail: owner.email,
      },
      // {
      //   Name: "Lucas Issayama",
      //   E_Mail: "lucas.issayama@grupomelocordeiro.com.br",
      // },
    ];
  }

  return sapContact;
}
