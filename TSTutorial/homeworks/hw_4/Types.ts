import { OrderStatusEnum, PaymentMethodEnum } from "./Enums"

export interface IOrder {
    id: number;
    customerId: number;
    customerName: string;
    order: IOrderMealObject[];
    price: number;
    status: OrderStatusEnum;
    paymentMethod: PaymentMethodEnum;
}

export interface IMeal {
    calculatePrice(): number;
    getMealInfo(): IOrderMealObject;
}

export interface IOrderMealObject {
    meal: string,
    details: Object,
}