import { extrairPrefixoLogradouro } from "../format/extrair-prefixo-logradouro";
import { extrairTextoLogradouro } from "../format/extrair-texto-logradouro";
import { formatCNPJ } from "../format/format-cnpj";
import { formatCpf } from "../format/format-cpf";
import { getDddFromPhone } from "./get-ddd-from-phone";
import { getIndFinal } from "./get-ind-final";
import { getIndIeDest } from "./get-ind-ie-dest";
import { getOnlyPhone } from "./get-only-phone";

export function formatSapSupplier(
  contact: any,
  // contact: any,
  // contact: any,
  creator: any
) {
  console.log(`cpf:${contact.cpf}`);
  console.log(`cnpj:${contact.cnpj}`);
  console.log(JSON.stringify({ contact }));
  if (!contact?.city?.name) {
    throw new Error("Preencher cidade do integrador");
  }

  let sapContact: any = {
    method: "POST",
    url: "/b1s/v1/BusinessPartners",
    requestId: contact.id,
    CardName: contact.name,
    AliasName: contact.name,
    CardType: "cSupplier",
    GroupCode: 123,
    City: contact?.city?.name,
    County: contact?.city.sapCounty,
    Country: "BR",
    EmailAddress: contact?.email,
    Block: contact?.neighborhood,
    BillToState: contact?.city.stateShortName,
    ShipToState: contact?.city.stateShortName,
    Address: contact?.streetAddress,
    ZipCode: contact?.zipCode?.replace(/\D+/g, ""),

    MailAddress: contact?.streetAddress,
    MailZipCode: contact?.zipCode?.replace(/\D+/g, ""),
    MailCity: contact?.city?.name,
    MailCounty: contact?.city.sapCounty,
    MailCountry: "BR",
    Phone1: getOnlyPhone(contact.phone),
    Phone2: getDddFromPhone(contact.phone),
    PayTermsGrpCode: -2,
    CreditLimit: 0,
    MaxCommitment: 0,
    DiscountPercent: 0,
    VatLiable: "vLiable",
    DeductibleAtSource: "tNO",
    DeductionPercent: 0,
    PriceListNum: -1,

    SalesPersonCode: 1273,
    Currency: "R$",

    DefaultBankCode: "-1",
    CardForeignName: contact.name,
    FatherType: "cPayments_sum",
    CreditCardCode: -1,
    CreditCardNum: null,
    CreditCardExpiration: null,
    DebitorAccount: "2.1.01.01.01",
    OpenOpportunities: null,
    Valid: "tYES",
    ValidFrom: null,
    ValidTo: null,
    ValidRemarks: null,
    Frozen: "tNO",
    FrozenFrom: null,
    FrozenTo: null,
    FrozenRemarks: null,

    ExemptNum: null,
    Priority: -1,
    FormCode1099: null,
    Box1099: null,
    PeymentMethodCode: "CP_01",
    BackOrder: "tYES",
    PartialDelivery: "tYES",
    BlockDunning: "tNO",
    BankCountry: null,
    HouseBank: null,
    HouseBankCountry: "BR",
    HouseBankAccount: null,
    ShipToDefault: "Entrega_1",
    DunningLevel: null,
    DunningDate: null,
    CollectionAuthorization: "tNO",
    DME: null,
    InstructionKey: null,
    SinglePayment: "tYES",
    ISRBillerID: null,
    PaymentBlock: "tNO",
    ReferenceDetails: null,
    HouseBankBranch: null,
    OwnerIDNumber: null,
    PaymentBlockDescription: -1,
    TaxExemptionLetterNum: null,
    MaxAmountOfExemption: 0,
    ExemptionValidityDateFrom: null,
    ExemptionValidityDateTo: null,
    LinkedBusinessPartner: null,
    LastMultiReconciliationNum: null,
    DeferredTax: "tNO",
    Equalization: "tNO",
    SubjectToWithholdingTax: "boNO",
    CertificateNumber: null,
    ExpirationDate: null,
    NationalInsuranceNum: null,
    AccrualCriteria: "tNO",
    WTCode: null,
    BillToBuildingFloorRoom: "",
    DownPaymentClearAct: "1.1.04.01.01",
    BilltoDefault: "Cobranca_1",
    CustomerBillofExchangDisc: "1.1.02.03.99",
    CustomerBillofExchangPres: "1.1.02.02.99",
    DunningTerm: "",
    CompanyPrivate: "cCompany",
    LanguageCode: 29,
    WithholdingTaxDeductionGroup: -1,
    TaxRoundingRule: "trr_CompanyDefault",
    DiscountBaseObject: "dgboNone",
    DiscountRelations: "dgrLowestDiscount",
    TypeReport: "atCompany",
    ThresholdOverlook: "tNO",
    SurchargeOverlook: "tNO",
    DownPaymentInterimAccount: "1.1.04.01.01",
    OperationCode347: "ocGoodsOrServiciesAcquisitions",
    InsuranceOperation347: "tNO",
    HierarchicalDeduction: "tNO",
    ShaamGroup: "sgServicesAndAsset",
    WithholdingTaxCertified: "tNO",
    BookkeepingCertified: "tNO",
    Affiliate: "tNO",
    DatevFirstDataEntry: "tYES",
    UseShippedGoodsAccount: "tNO",
    HouseBankIBAN: "",
    Series: 71,
    EffectiveDiscount: "dgrLowestDiscount",
    NoDiscounts: "tNO",
    EffectivePrice: "epDefaultPriority",
    EffectivePriceConsidersPriceBeforeDiscount: "tNO",
    ResidenNumber: "rntSpanishFiscalID",

    EndorsableChecksFromBP: "tYES",
    AcceptsEndorsedChecks: "tNO",
    BlockSendingMarketingContent: "tNO",
    UpdateDate: "2024-12-30T00:00:00Z",
    UpdateTime: "11:49:03",
    ExemptionMaxAmountValidationType: "emaIndividual",
    UseBillToAddrToDetermineTax: "tNO",
    CreateDate: "2024-12-30T00:00:00Z",
    CreateTime: "11:48:55",
    FCERelevant: "tNO",
    FCEValidateBaseDelivery: "tNO",
    DataVersion: 2,
    ExchangeRateForIncomingPayment: "tYES",
    ExchangeRateForOutgoingPayment: "tYES",
    FCEAsPaymentMeans: "tNO",
    NotRelevantForMonthlyInvoice: "tNO",
    U_COD_CONS: "0",
    U_TpAssinante: "0",
    U_TpLigacao: "0",
    U_CodUtil: "0",
    U_CodTens: "0",
    U_TpCli_ComEnerg: "00",
    U_UPPTaxId: contact?.cnpj,
    U_UPTxIdIE: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
    U_UPTipoPN: 1,
    U_UPIgnNFe: "N",
    U_UPCadImp: "N",
    U_UPNFRtSC: "0",
    U_UPQ_ClassFrn: "Q",
    U_UPQ_IQF: 0,

    U_UPW_SempreGerarEsbocoSeparacao: "N",

    U_TX_IndIEDest:
      contact.ie && contact.ie !== "" && contact.sintegraContribuinteIcms
        ? "1"
        : "9",
    //0-Definido pelo sistema
    //1-Contribuinte ICMS
    //2-Contribuinte - Isento de inscricao
    //9-Não contribuinte,

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

        // RowNum: 0,
        TaasEnabled: "tYES",
        //To add
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

        // RowNum: 1,
        TaasEnabled: "tYES",
        //To add
        U_TX_IE: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        U_CCIncentivoFiscal: contact.cnpj ? formatCNPJ(contact.cnpj) : null,
        U_TX_IndIEDest: getIndIeDest(contact),
        U_TX_IndFinal: getIndFinal(contact),
      },
    ],
    ContactEmployees: [],
    BPAccountReceivablePaybleCollection: [
      {
        AccountType: "bpat_Payable",
        AccountCode: "2.1.01.01.01",
      },
    ],
    BPPaymentMethods: [
      {
        PaymentMethodCode: "CP_01",
        RowNumber: 0,
      },
    ],

    BPBranchAssignment: [
      {
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
  };

  if (contact.cpf) {
    sapContact.BPFiscalTaxIDCollection = [
      // {
      //   Address: "",
      //   TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
      //   TaxId4: contact.cpf,
      //   AddrType: "bo_BillTo",
      //   AToRetrNFe: "tNO",
      // },
      {
        Address: ``,
        TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        TaxId4: formatCpf(contact.cpf),
        AddrType: "bo_BillTo",
        AToRetrNFe: "tNO",
      },
    ];
  }

  if (contact.cnpj) {
    sapContact.BPFiscalTaxIDCollection = [
      {
        Address: ``,
        TaxId0: formatCNPJ(contact.cnpj),
        TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        AddrType: "bo_ShipTo",
        AToRetrNFe: "tNO",
      },
      {
        Address: "Cobranca_1",
        TaxId0: formatCNPJ(contact.cnpj),
        TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        AddrType: "bo_BillTo",
        AToRetrNFe: "tNO",
      },
      {
        Address: "Entrega_1",
        TaxId0: formatCNPJ(contact.cnpj),
        TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
        AddrType: "bo_ShipTo",
        AToRetrNFe: "tNO",
      },
    ];
  }

  let owner = contact?.owner;
  //alert(JSON.stringify(owner));
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
