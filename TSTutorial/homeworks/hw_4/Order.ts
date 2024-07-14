import {TOrder, IMeal} from "./Types"
import {OrderStatusEnum, PaymentMethodEnum} from "./Enums";

export class Order {
    private customerId: number = 0 
    private orders: TOrder[] = [] 
    private id: number = 1
    private counter: number = 0

    makeOrder(customerName: string, meal: IMeal[] | IMeal, paymentMethod: PaymentMethodEnum) {
        if (Array.isArray(meal)) {
            this.counter = meal.length - 1;
            meal.forEach(item => this.makeOrder(customerName, item, paymentMethod));
            return;
        }

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
        
        if (--this.counter === -1) {
            console.log(`Order ${JSON.stringify(this.orders[this.orders.length - 1])} was added to bucket for ${customerName}\n`)
            this.counter = 0;
        }
    }

    getAllOrders(): TOrder[] {
        return this.orders;
    }

    private getOrderByCustomerIdOrName(filter: string | number): TOrder {
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