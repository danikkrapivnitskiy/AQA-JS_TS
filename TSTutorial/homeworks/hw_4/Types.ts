import { OrderStatusEnum, PaymentMethodEnum } from "./Enums"

export type TOrder = {
    id: number;
    customerId: number;
    customerName: string;
    order: Object[];
    price: number;
    status: OrderStatusEnum;
    paymentMethod: PaymentMethodEnum;
}

export interface IMeal {
    calculatePrice(): number;
    getMealInfo(): Object;
}