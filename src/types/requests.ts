export interface RequestGeneric<T> {
    data: T[],
    meta: {
        pagination:{
            total?: number,
            page?: number,
            pageCount: number,
            pageSize: number
        }
    }
}