import { IOrder } from "./Types";
import { OrderService } from "./OrderService";

export default class Pizzeria {
    private orderService: OrderService
    constructor(private name: string, private adress: string, private workingHours: string) {
        console.log(`Welcome to Pizzeria '${this.name}' on adress '${this.adress}' at '${this.workingHours}'`)
        this.orderService = new OrderService()
    }

    addOrders(order: IOrder[]): void {
        this.orderService.addOrder(order)
        this.orderService.setStatusToAddedOrders();
    }

    prepareOrder(): void {
        this.orderService.setPreparedOrderStatusAndTakeInProgressAnother()
    }

    takeTheOrder() {
        const order = this.orderService.getCompletedOrder()
        console.log(`Pay ${order.price} by ${order.paymentMethod} and take ${JSON.stringify(order.order)}. Thank you and come back soon!\n`)
        this.orderService.setDeliveredStatusToCompletedOrder()
    }

    removeOrder(orderId: number): void {
        this.orderService.removeOrder(orderId)
    }

    getTotalRevenue(): string {
        return this.orderService.getTotalRevenue()
    }

    getAllOrders(): IOrder[] {
        return this.orderService.getAllOrders()
    }
}