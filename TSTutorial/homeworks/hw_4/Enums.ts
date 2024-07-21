export enum OrderStatusEnum {
    PENDING = "Pending",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled",
    REFUNDED = "Refunded",
    RETURNED = "Returned",
    EXPIRED = "Expired",
    REJECTED = "Rejected",
    PROCESSING = "Processing",
    DELIVERED = "Delivered",
    REVIEWED = "Reviewed",
    SHIPPED = "Shipped",
    IN_PROGRESS = "In Progress",
}

export enum PaymentMethodEnum {
    CREDIT_CARD = "Credit Card",
    PAYPAL = "PayPal",
    ONLINE_BANKING = "Online Banking",
    CASH = "Cash",
    BANK_TRANSFER = "Bank Transfer",
    CREDIT_DEBIT = "Credit Debit",
    DEBIT_CARD = "Debit Card",
    OpenAI_PAY = "OpenAI Pay",
    APPLE_PAY = "Apple Pay",
}

export enum CupSizeEnum {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

export enum DoughTexturePizzaEnum {
    Crispy = 'Crispy', 
    Chewy = 'Chewy',
    Tough = 'Tough',
}

export enum PizzaSizeEnum {
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
}