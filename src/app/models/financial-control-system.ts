export interface RevenueWithFlowOfMoney {
    purchaseDate?: string;
    revenue?: number;
    transfer?: number;
    card?: number;
    cash?: number;
    debt?: number;
    diff?: number;
}

export interface STATUS {
    label?: string;
    value?: number
}