import { LayoutItem } from "./structure"

export type QuoteKit = {
    id: number
    name: string 
    quantity: number 
    priceInCents: number 
    description: string 
    quoteKitNumber: number 
    deleted: boolean 
    deletedAt: any
    dcPower: number 
    shippingDate: string 
    
    priceListJson?: {
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
    uuid: string 
    costInCents: number 
    erpId: string 
    quoteKitItems?: any
    price?: any
    priceKitItemsInCents: any
    structureName: any
    layoutItems: LayoutItem[];
    singleItems: boolean
}