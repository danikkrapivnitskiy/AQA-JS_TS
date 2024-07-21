import {IOrder, IMeal} from "./Types"
import {OrderStatusEnum, PaymentMethodEnum} from "./Enums";

export default class Order {
    private customerId: number = 0 
    private orders: IOrder[] = [] 
    private id: number = 1

    makeOrder(customerName: string, meal: IMeal[] | IMeal, paymentMethod: PaymentMethodEnum) {
        if (Array.isArray(meal)) { 
            meal.forEach(item => this.processMeal(customerName, item, paymentMethod));  
        } else { 
            this.processMeal(customerName, meal, paymentMethod)  
        } 
        console.log(`Order ${JSON.stringify(this.getOrderByCustomerIdOrName(customerName))} was added to bucket for ${customerName}\n`)
    }

    private processMeal(customerName: string, meal: IMeal, paymentMethod: PaymentMethodEnum) {
        this.createCustomerIdByName(customerName);

        if (!this.verifyIfCustomerExists(customerName) 
            || this.getOrderByCustomerIdOrName(customerName).status !== OrderStatusEnum.PROCESSING) {
            const entity = {
                id: this.id++, 
                price: meal.calculatePrice(),
                customerId: this.customerId,
                customerName: customerName,
                order: [meal.getMealInfo()],
                status: OrderStatusEnum.PROCESSING,
                paymentMethod: paymentMethod,
            }
            this.orders.push(entity)
        } else {
            this.getOrderByCustomerIdOrName(this.customerId)["price"] += meal.calculatePrice();
            this.getOrderByCustomerIdOrName(this.customerId)["order"].push(meal.getMealInfo());
        }
    }

    getAllOrders(): IOrder[] {
        return this.orders;
    }

    updateOrder(orders: IOrder[]): void {
        this.orders.splice(0, this.orders.length);
        this.orders.push(...orders)  
    }

    private getOrderByCustomerIdOrName(filter: string | number): IOrder {
        const order = typeof filter === "string" 
        ? this.orders.find(entity => entity.customerName === filter) 
        : this.orders.find(entity => entity.customerId === filter) 
        if (order === undefined) {
            throw new Error(`Order for customer ${filter} not found`)
        }
        return order;
    }

    private verifyIfCustomerExists(customerName: string): boolean {
        return this.orders.filter(orderItem => orderItem.customerName === customerName).length > 0;
    }

    private createCustomerIdByName(name: string) {
        this.verifyIfCustomerExists(name)
        ? this.customerId
        : this.customerId++;
    }
}