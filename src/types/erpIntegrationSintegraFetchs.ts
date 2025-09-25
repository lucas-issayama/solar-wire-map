export type ConsultSintegraFetchResponse = {
    message: {
        updatedAt: number
        valid: boolean
        active: boolean
        ie: string
        statusIe: boolean
        statusDesc: string
        statusIeDesc: string
        streetAddress: string
        streetAddressLine2: string
        streetAddressNumber: string
        zipCode: string
        cityName: string
        stateName: string
        neighborhood: string
        name: string
        legalName: string
        contribuinteIcms: boolean
        info: {
          code: string
          status: string
          message: string
          cnpj: string
          inscricao_estadual: string
          nome_empresarial: string
          nome_fantasia: string
          situacao_cnpj: string
          situacao_ie: string
          situacao_ie_desc: string
          cnae_principal: {
            code: string
            text: string
          }
          cep: string
          uf: string
          municipio: string
          bairro: string
          logradouro: string
          numero: string
          complemento: string
          regime_tributacao: string
          informacao_ie_como_destinatario: string
          porte_empresa: string
          tipo_inscricao: string
          data_inicio_atividade: string
          data_fim_atividade: string
          data_situacao_cadastral: string
          contribuinte_icms: boolean
          ibge: {
            codigo_municipio: string
            codigo_uf: string
          }
          ccc: boolean
          version: string
        }
    },
    success: boolean
  }
  