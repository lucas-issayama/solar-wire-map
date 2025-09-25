export type GetQuoteKitByQuoteIdResponse = {
    data: {
      quoteKits: {
        data: Array<{
          id: string
          attributes: {
            name: string | null
            quantity: number | null
            priceInCents: number | null
            description: string | null
            quoteKitNumber: number | null
            deleted: boolean | null
            deletedAt: any
            dcPower: number | null
            singleItems: boolean | null
            shippingDate: string | null
            priceListJson: {
              id: number
              name: string
              enabled: boolean
              createdAt: string
              labelText: any
              updatedAt: string
              labelColor: any
              publishedAt: string
              readyToShip: any
              shippingDate: any
            }
            uuid: string | null
            costInCents: number | null
            erpId: string | null
            structureName: string | null
            priceKitItemsInCents: any
            quoteKitItems: {
              data: Array<{
                id: string
                attributes: {
                  name: string | null
                  quantity: number | null
                  priceInCents: number | null
                  description: string | null
                  code?: string | null
                  shippingDate: string | null
                  deleted: boolean
                  uuid: string | null
                  erpId: string | null
                  cost: number | null
                  costInCents: number | null
                  type: string | null
                }
              }>
            }
          }
        }>
      }
    }
  }
  