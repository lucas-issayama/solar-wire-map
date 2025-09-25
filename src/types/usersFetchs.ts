export type UsersFetchResponse = {
    data: {
      usersPermissionsUsers: {
        data: Array<{
          id: string
          attributes: {
            username: string
            email: string
            confirmed: boolean
            blocked: boolean
            role: {
              data: {
                id: string
              } | null
            }
            provider: string
            enterprise: {
              data: {
                id: string
              } | null
            }
            integrators: {
              data: Array<{
                id: string
              }> | null
            }
            quotes: {
              data: Array<{
                id: string
              }> | null
            }
          }
        }> | null
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
  
  export type UserFetchResponse = {
    data: {
        usersPermissionsUser: {
          data: {
            id: string
            attributes: {
              username: string
              email: string
              confirmed: boolean
              blocked: boolean
              role: {
                data: {
                  id: string
                }| null
              }
              provider: string
              enterprise: {
                data: {
                  id: string
                }| null
              }
              integrators: {
                data: Array<{
                  id: string
                }> | null
              }
              quotes: {
                data: Array<{
                  id: string
                }> | null
              } 
            }
          } | null
        }
      }
  }
  