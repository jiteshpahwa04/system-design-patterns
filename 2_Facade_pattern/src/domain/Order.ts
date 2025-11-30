import { Product } from './Product';
import { Customer } from './Customer';

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class OrderImpl implements Order {
  constructor(
    public id: string,
    public customer: Customer,
    public items: OrderItem[],
    public totalAmount: number,
    public status: OrderStatus = OrderStatus.PENDING,
    public createdAt: Date = new Date()
  ) {}
}
