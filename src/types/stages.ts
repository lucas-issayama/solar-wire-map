export type GetStagesByNameResponse = {
    data: {
      stages: {
        data: Array<{
          id: string
          attributes: {
            name: string
            slug: string
          }
        }>
      }
    }
  }
  