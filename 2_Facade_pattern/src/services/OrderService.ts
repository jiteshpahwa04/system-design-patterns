import { Order, OrderImpl, OrderStatus, OrderItem } from '../domain/Order';
import { Customer } from '../domain/Customer';
import { Product } from '../domain/Product';

export class OrderService {
  private orders: Map<string, Order> = new Map();
  private orderCounter: number = 1;

  public createOrder(customer: Customer, items: OrderItem[]): Order {
    const orderId = this.generateOrderId(); //order Id creation logic changes
    const totalAmount = this.calculateTotal(items);
    
    const order = new OrderImpl(
      orderId,
      customer,
      items,
      totalAmount,
      OrderStatus.PENDING
    );

    this.orders.set(orderId, order);
    console.log(`Order created: ${orderId} for customer ${customer.name}`);
    
    return order;
  }

  public saveOrder(order: Order): boolean {
    try {
      this.orders.set(order.id, order);
      console.log(`Order saved: ${order.id}`);
      return true;
    } catch (error) {
      console.error(`Failed to save order ${order.id}:`, error);
      return false;
    }
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): boolean {
    const order = this.orders.get(orderId);
    if (order) {
      order.status = status;
      this.orders.set(orderId, order);
      console.log(`Order ${orderId} status updated to ${status}`);
      return true;
    }
    return false;
  }

  private generateOrderId(): string {
    return `ORD_${String(this.orderCounter++).padStart(6, '0')}`;
  }

  private calculateTotal(items: OrderItem[]): number {
    return items.reduce((total, item) => {
      return total + (item.unitPrice * item.quantity);
    }, 0);
  }

}
