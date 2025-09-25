import { SisOrder } from "./sisOrder"

export type GraphQLRequest<T> = {
    id: number
    attributes: T
}

export type SisOrdersGraphQL = {
    data: {
        sisOrders:{
            data: GraphQLRequest<SisOrder>[]
        }
    }
}