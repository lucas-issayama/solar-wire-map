export type EnterpriseFetchResponse = {
    data: {
      enterprises: {
        data: Array<{
          id: string
          attributes: {
            name: string
            cnpj: string
            ie: string
            users: {
              data: Array<{
                id: string
              }> | null
            }
            owner: {
              data: {
                id: string
                attributes: {
                  username: string
                }
              } | null
            }
            addresses: {
              data: Array<{
                id: string
              }> | null
            }
            quotes: {
              data: Array<{
                id: string
              }> | null
            }
            statusId: number
            category: {
              data: {
                id: string
              }
            }
          }
        }>
        meta: {
          pagination: {
            total: number
            page: number
            pageSize: number
            pageCount: number
          }
        }
      }
    }
  }

  export type EnterpriseInputDataUpdate = {
    name?: string | null,
    cnpj?: string | null,
    status?: string | null,
    ie?: string | null,
    users?: number[] 
    owner?: number | null
    addresses?: number[]
    quotes?: number[]
    priceList?:{
      data:{
        id: number
      }
    }
    statusId?: number
    category?: number

  }

  export type EnterpriseInputDataCreate = {
    name: string
    cnpj: string
    ie: string
    users?: {
      data: {
        id: number
      }[] 
    }
    category?: number
    statusId: number
    owner: number
    addresses?: {
      data: {
        id: number
      }[]
    }
    quotes?: {
      data: {
        id: number
      }[]
    },
    publishedAt?: string
  }
  
  export type EnterpriseUpdateResponse = {
    data: {
      updateEnterprise: {
        data: {
          id: string
          attributes: {
            name: string
            cnpj: string
            ie: string
            statusId: number
            category: {
              data: {
                id: string
              }
            }
            users: {
              data: Array<{
                id: string
              }>
            }
            addresses: {
              data: Array<{
                id: string
              }>
            }
            quotes: {
              data: Array<{
                id: string
              }>
            }
            owner: {
              data: {
                id: string,
                attributes: {
                  username:string
                }
            } | null
            }
          }
        }
      }
    }
  }
  
  export type EnterpriseCreateResponse = {
    data: {
      createEnterprise: {
        data: {
          id: string
          attributes: {
            name: string | null
            cnpj: string | null
            ie: string | null
            statusId: number | null
            category :{
              data: {
                id: string
              }
            } | null
            users: {
              data: Array<{
                id: string
              }>
            }
            addresses: {
              data: Array<{
                id: string
              }>
            }
            quotes: {
              data: Array<{
                id: string
              }>
            }
            owner: {
              data: {
                id: string,
                attributes: {
                  username: string
                }
              }
            } | null
          }
        }
      }
    }
  }

  export type EnterpriseFetchByIdResponse = {
    data: {
      enterprise: {
        data: {
          id: string
          attributes: {
            name: string
            cnpj: string
            ie: string
            statusId: number
            category: {
              data: {
                id: string,
                attributes:{
                  name: string
                }
              }
            }
            users: {
              data: Array<{
                id: string
              }>
            }
            addresses: {
              data: Array<{
                id: string
              }>
            }
            quotes: {
              data: Array<{
                id: string
              }>
            }
            owner: {
              data: {
                id: string
                attributes: {
                  username: string
                }
              }
            }
          }
        }
      }
    }
  }