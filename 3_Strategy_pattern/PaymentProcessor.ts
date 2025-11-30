import { PaymentStrategy, PaymentResult, PaymentDetails } from './PaymentStrategy';

/**
 * Context class that uses a payment strategy to process payments.
 * This is the main class that clients interact with.
 */
export class PaymentProcessor {
  private paymentStrategy: PaymentStrategy | null = null;

  /**
   * Initialize the payment processor with an optional payment strategy.
   * 
   * @param paymentStrategy - The payment strategy to use
   */
  constructor(paymentStrategy?: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy || null;
  }

  /**
   * Set or change the payment strategy at runtime.
   * 
   * @param paymentStrategy - The new payment strategy to use
   */
  setPaymentStrategy(paymentStrategy: PaymentStrategy): void {
    this.paymentStrategy = paymentStrategy;
  }

  /**
   * Process a payment using the current payment strategy.
   * 
   * @param amount - The amount to be paid
   * @param paymentDetails - Payment-specific details
   * @returns Result of the payment processing
   * @throws Error if no payment strategy is set
   */
  processPayment(amount: number, paymentDetails: PaymentDetails): PaymentResult {
    if (this.paymentStrategy === null) {
      throw new Error('No payment strategy set. Please set a payment strategy first.');
    }

    // Validate payment details before processing
    if (!this.paymentStrategy.validatePaymentDetails(paymentDetails)) {
      return {
        success: false,
        message: 'Invalid payment details provided',
        transactionId: null,
        amount,
        paymentMethod: this.paymentStrategy.constructor.name
      };
    }

    // Process the payment using the current strategy
    return this.paymentStrategy.processPayment(amount, paymentDetails);
  }

  /**
   * Get the name of the current payment strategy.
   * 
   * @returns Name of the current strategy or null if no strategy is set
   */
  getCurrentStrategy(): string | null {
    if (this.paymentStrategy === null) {
      return null;
    }
    return this.paymentStrategy.constructor.name;
  }

}
