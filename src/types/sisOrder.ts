import { Quote } from "@/types/quote"

export type SisOrder = {
    id?: string
    sisId: number | null
    sisId2: number | null
    transactionType: number | null
    transactionType2: number | null
    accountId: number | null
    dateArrival: string | null
    dateDelivery: string | null
    datePayment: string | null
    dateProduction: string | null
    paymentTerms: number | null
    paymentTerms2: number | null
    paymentMethod: number | null
    obs: string | null
    cfop: number | null
    cfop2: number | null
    cio: number | null
    cio2: number | null
    ctCfop: number | null
    ctCio: number | null
    sisIdCanceled: boolean | null
    sisId2Canceled: boolean | null
    quote?: Quote
}

