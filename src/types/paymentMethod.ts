interface PaymentMethod  {
    id?: string
    label?: string
    dailyRate?: number;
    monthlyRate?: number;
    days?: number;
    maxNumberOfInstallments?: number;
    interestAmountInCents?: number;
    enabled?: boolean;
}

interface GetPaymentMethods {
    data: {
        paymentMethods:{
            data: Array<{
                id: string
                attributes: PaymentMethod
            }>
        }
    }
}