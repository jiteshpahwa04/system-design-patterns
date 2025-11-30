import { OrderFacade, PlaceOrderRequest } from '../facade/OrderFacade';
import { Customer, CustomerImpl } from '../domain/Customer';
import { PaymentMethod } from '../services/PaymentService';

/**
 * OrderController - Demonstrates how the Facade pattern simplifies complex operations
 * 
 * Without the facade, the controller would need to:
 * 1. Look up products in catalog
 * 2. Validate product availability
 * 3. Calculate totals
 * 4. Process payment
 * 5. Create order
 * 6. Save order
 * 7. Handle all error cases
 * 
 * With the facade, it's just one method call!
 */
export class OrderController {
  private orderFacade: OrderFacade;

  constructor() {
    this.orderFacade = new OrderFacade();
  }

  /**
   * Simple method to place an order - the facade handles all complexity
   */
  public async placeOrder(
    customerId: string,
    customerName: string,
    customerEmail: string,
    customerAddress: string,
    productIds: string[],
    quantities: number[],
    paymentType: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER',
    paymentDetails: string
  ): Promise<{ success: boolean; orderId?: string; error?: string }> {
    
    // Create customer object
    const customer = new CustomerImpl(customerId, customerName, customerEmail, customerAddress);
    
    // Create payment method
    const paymentMethod: PaymentMethod = {
      type: paymentType,
      details: paymentDetails
    };

    // Create order request
    const orderRequest: PlaceOrderRequest = {
      customer,
      productIds,
      quantities,
      paymentMethod
    };

    // Place order using facade - this single call handles everything!
    const result = await this.orderFacade.placeOrder(orderRequest);

    if (result.success && result.order) {
      return {
        success: true,
        orderId: result.order.id
      };
    } else {
      return {
        success: false,
        error: result.errorMessage
      };
    }
  }

}
