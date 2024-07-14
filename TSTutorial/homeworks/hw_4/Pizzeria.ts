import { TOrder } from "./Types";
import {OrderStatusEnum} from "./Enums";

export default class Pizzeria {
    private orders: TOrder[] = []
    constructor(private name: string, private adress: string, private workingHours: string) {
        console.log(`Welcome to Pizzeria '${this.name}' on adress '${this.adress}' at '${this.workingHours}'`)
    }

    addOrders(order: TOrder[]): void {
        this.orders.push(...order)
        if (this.getOrderByStatus(OrderStatusEnum.PROCESSING) !== null
            && this.getOrderByStatus(OrderStatusEnum.IN_PROGRESS) === null) {
            this.setStatusToOrder(OrderStatusEnum.PROCESSING, OrderStatusEnum.IN_PROGRESS)
        } else this.setStatusToOrder(OrderStatusEnum.PROCESSING, OrderStatusEnum.PENDING)
    }

    private setStatusToOrder(previosStatus: OrderStatusEnum, nextStatus: OrderStatusEnum): void {
        const order = this.getOrderByStatus(previosStatus)
        if (order === null) {
            throw new Error(`Order with status ${previosStatus} not found`)
        }
        order.status = nextStatus;
        console.log(`Order for ${order.customerName} is ${order.status}\n`)
    }

    prepareOrder(): void {
        this.setStatusToOrder(OrderStatusEnum.IN_PROGRESS, OrderStatusEnum.COMPLETED)
        if (this.getOrderByStatus(OrderStatusEnum.PROCESSING) !== null) {
            this.setStatusToOrder(OrderStatusEnum.PROCESSING, OrderStatusEnum.IN_PROGRESS)
        } else if (this.getOrderByStatus(OrderStatusEnum.PENDING) !== null) {
            this.setStatusToOrder(OrderStatusEnum.PENDING, OrderStatusEnum.IN_PROGRESS)
        }
    }

    takeTheOrder() {
        const order = this.getOrderByStatus(OrderStatusEnum.COMPLETED)
        if (order === null) {
            throw new Error(`No orders with status ${OrderStatusEnum.COMPLETED}`)
        }
        console.log(`Pay ${order.price} by ${order.paymentMethod} and take ${JSON.stringify(order.order)}. Thank you and come back soon!\n`)
        this.setStatusToOrder(OrderStatusEnum.COMPLETED, OrderStatusEnum.DELIVERED)
    }

    private getOrderByStatus(status: OrderStatusEnum): TOrder | null {
        const orderIndex = this.orders.findIndex(order => order.status === status);
        return orderIndex !== -1
        ? this.orders[orderIndex]
        : null
    }

    removeOrder(orderId: number): void {
        const index = this.orders.findIndex(order => order.id === orderId)
        if (index > -1) {
            this.orders.splice(index, 1)
            return
        }
        console.log(`Order with id ${orderId} not found`)
    }

    getTotalRevenue(): string {
        const totalRevenue = this.orders.reduce((sum, order) => sum + order.price, 0)
        return `$${totalRevenue.toFixed(2)}`
    }

    getAllOrders(): TOrder[] {
        return this.orders;
    }
}