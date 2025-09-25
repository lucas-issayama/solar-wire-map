export type ReceitaResponse = {
  success: boolean;
  message: {
    updatedAt: number;
    active: boolean;
    valid: boolean;
    statusDesc: string;
    streetAddress: string;
    streetAddressLine2: string;
    streetAddressNumber: string;
    zipCode: string;
    cityName: string;
    stateName: string;
    neighborhood: string;
    name: string;
    email: string;
    info: {
      abertura: string;
      situacao: string;
      tipo: string;
      nome: string;
      fantasia: string;
      porte: string;
      natureza_juridica: string;
      atividade_principal: Array<{
        code: string;
        text: string;
      }>;
      atividades_secundarias: Array<{
        code: string;
        text: string;
      }>;
      qsa: Array<{
        nome: string;
        qual: string;
        nome_rep_legal?: string;
        qual_rep_legal?: string;
      }>;
      logradouro: string;
      numero: string;
      complemento: string;
      municipio: string;
      bairro: string;
      uf: string;
      cep: string;
      email: string;
      telefone: string;
      data_situacao: string;
      cnpj: string;
      ultima_atualizacao: string;
      status: string;
      efr: string;
      motivo_situacao: string;
      situacao_especial: string;
      data_situacao_especial: string;
      capital_social: string;
      simples: {
        optante: boolean;
        data_opcao: any;
        data_exclusao: any;
        ultima_atualizacao: string;
      };
      simei: {
        optante: boolean;
        data_opcao: any;
        data_exclusao: any;
        ultima_atualizacao: string;
      };
      extra: {};
      billing: {
        free: boolean;
        database: boolean;
      };
    };
    hasCnaeSolar: boolean;
  };
};
