export type CategoriesFetchResponse = {
    data: {
      categories: {
        data: Array<{
          id: string
          attributes: {
            name: string
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

  export type CategoryFindByIdResponse = {
    data: {
      category: {
        data: {
          id: string
          attributes: {
            name: string
          }
        }
      }
    }
  }