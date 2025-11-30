import { Customer } from '../domain/Customer';
import { Product } from '../domain/Product';
import { Order, OrderItem, OrderStatus } from '../domain/Order';
import { CatalogService } from '../services/CatalogService';
import { PaymentService, PaymentMethod } from '../services/PaymentService';
import { OrderService } from '../services/OrderService';

export interface PlaceOrderRequest {
  customer: Customer;
  productIds: string[];
  quantities: number[];
  paymentMethod: PaymentMethod;
}

export interface PlaceOrderResult {
  success: boolean;
  order?: Order;
  errorMessage?: string;
}

/**
 * OrderFacade - The main Facade class that simplifies the complex order placement process
 * 
 * This facade hides the complexity of:
 * - Product catalog lookup
 * - Total calculation
 * - Payment processing
 * - Order creation and saving
 * 
 * The client only needs to call placeOrder() with simple parameters
 */
export class OrderFacade {
  private catalogService: CatalogService;
  private paymentService: PaymentService;
  private orderService: OrderService;

  constructor() {
    this.catalogService = new CatalogService();
    this.paymentService = new PaymentService();
    this.orderService = new OrderService();
  }

  /**
   * Main method that handles the entire order placement process
   * This is the single entry point that hides all the complexity
   */
  public async placeOrder(request: PlaceOrderRequest): Promise<PlaceOrderResult> {
    try {
      console.log('=== Starting Order Placement Process ===');
      
      // Step 1: Validate and lookup products
      const orderItems = await this.buildOrderItems(request.productIds, request.quantities);
      if (!orderItems) {
        return {
          success: false,
          errorMessage: 'Failed to validate products or quantities'
        };
      }

      // Step 2: Calculate total
      const totalAmount = this.calculateTotal(orderItems);
      console.log(`Total amount calculated: $${totalAmount.toFixed(2)}`);

      // Step 3: Process payment
      const paymentResult = this.paymentService.processPayment(totalAmount, request.paymentMethod);
      if (!paymentResult.success) {
        return {
          success: false,
          errorMessage: `Payment failed: ${paymentResult.errorMessage}`
        };
      }

      // Step 4: Create order
      const order = this.orderService.createOrder(request.customer, orderItems);
      
      // Step 5: Save order
      const saveSuccess = this.orderService.saveOrder(order);
      if (!saveSuccess) {
        return {
          success: false,
          errorMessage: 'Failed to save order'
        };
      }

      // Step 6: Update order status to confirmed
      this.orderService.updateOrderStatus(order.id, OrderStatus.CONFIRMED);

      console.log('=== Order Placement Completed Successfully ===');
      
      return {
        success: true,
        order
      };

    } catch (error) {
      console.error('Error in order placement:', error);
      return {
        success: false,
        errorMessage: `Order placement failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Helper method to build order items from product IDs and quantities
   * This encapsulates the product lookup logic
   */
  private async buildOrderItems(productIds: string[], quantities: number[]): Promise<OrderItem[] | null> {
    if (productIds.length !== quantities.length) {
      console.error('Product IDs and quantities arrays must have the same length');
      return null;
    }

    const orderItems: OrderItem[] = [];

    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const quantity = quantities[i];

      // Lookup product in catalog
      const product = this.catalogService.findProduct(productId);
      if (!product) {
        console.error(`Product not found: ${productId}`);
        return null;
      }

      // Check if product is available
      if (!this.catalogService.isProductAvailable(productId)) {
        console.error(`Product not available: ${product.name}`);
        return null;
      }

      // Validate quantity
      if (quantity <= 0) {
        console.error(`Invalid quantity for product ${product.name}: ${quantity}`);
        return null;
      }

      orderItems.push({
        product,
        quantity,
        unitPrice: product.price
      });

      console.log(`Added to order: ${product.name} x${quantity} @ $${product.price}`);
    }

    return orderItems;
  }

  /**
   * Helper method to calculate total amount
   * This encapsulates the calculation logic
   */
  private calculateTotal(orderItems: OrderItem[]): number {
    return orderItems.reduce((total, item) => {
      return total + (item.unitPrice * item.quantity);
    }, 0);
  }

}
