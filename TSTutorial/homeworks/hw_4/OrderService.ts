import {TOrder} from "./Types"
import {OrderStatusEnum} from "./Enums";

export class OrderService {
    private orders: TOrder[] = []

    addOrder(order: TOrder[]): void {
        this.orders.push(...order)
    }
    
    getOrderByStatus(status: OrderStatusEnum): TOrder | null {
        const orderIndex = this.orders.findIndex(order => order.status === status);
        return orderIndex !== -1
        ? this.orders[orderIndex]
        : null
    }

    setStatusToOrder(previosStatus: OrderStatusEnum, nextStatus: OrderStatusEnum): void {
        const order = this.getOrderByStatus(previosStatus)
        if (order === null) {
            throw new Error(`Order with status ${previosStatus} not found`)
        }
        order.status = nextStatus;
        console.log(`Order for ${order.customerName} is ${order.status}\n`)
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