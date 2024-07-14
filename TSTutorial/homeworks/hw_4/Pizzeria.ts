import { TOrder } from "./Types";
import {OrderStatusEnum} from "./Enums";
import { OrderService } from "./OrderService";

export default class Pizzeria {
    private orderService: OrderService
    constructor(private name: string, private adress: string, private workingHours: string) {
        console.log(`Welcome to Pizzeria '${this.name}' on adress '${this.adress}' at '${this.workingHours}'`)
        this.orderService = new OrderService()
    }

    addOrders(order: TOrder[]): void {
        this.orderService.addOrder(order)
        if (this.orderService.getOrderByStatus(OrderStatusEnum.PROCESSING) !== null
            && this.orderService.getOrderByStatus(OrderStatusEnum.IN_PROGRESS) === null) {
            this.orderService.setStatusToOrder(OrderStatusEnum.PROCESSING, OrderStatusEnum.IN_PROGRESS)
        } else this.orderService.setStatusToOrder(OrderStatusEnum.PROCESSING, OrderStatusEnum.PENDING)
    }

    prepareOrder(): void {
        this.orderService.setStatusToOrder(OrderStatusEnum.IN_PROGRESS, OrderStatusEnum.COMPLETED)
        if (this.orderService.getOrderByStatus(OrderStatusEnum.PROCESSING) !== null) {
            this.orderService.setStatusToOrder(OrderStatusEnum.PROCESSING, OrderStatusEnum.IN_PROGRESS)
        } else if (this.orderService.getOrderByStatus(OrderStatusEnum.PENDING) !== null) {
            this.orderService.setStatusToOrder(OrderStatusEnum.PENDING, OrderStatusEnum.IN_PROGRESS)
        }
    }

    takeTheOrder() {
        const order = this.orderService.getOrderByStatus(OrderStatusEnum.COMPLETED)
        if (order === null) {
            throw new Error(`No orders with status ${OrderStatusEnum.COMPLETED}`)
        }
        console.log(`Pay ${order.price} by ${order.paymentMethod} and take ${JSON.stringify(order.order)}. Thank you and come back soon!\n`)
        this.orderService.setStatusToOrder(OrderStatusEnum.COMPLETED, OrderStatusEnum.DELIVERED)
    }

    removeOrder(orderId: number): void {
        this.orderService.removeOrder(orderId)
    }

    getTotalRevenue(): string {
        return this.orderService.getTotalRevenue()
    }

    getAllOrders(): TOrder[] {
        return this.orderService.getAllOrders()
    }
}