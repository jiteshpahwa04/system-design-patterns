/**
 * Payment result interface
 */
export interface PaymentResult {
  success: boolean;
  message: string;
  transactionId: string | null;
  amount: number;
  paymentMethod: string;
  [key: string]: any; // Allow additional properties for specific payment methods
}

/**
 * Payment details interface
 */
export interface PaymentDetails {
  [key: string]: any; // Flexible structure for different payment methods
}

/**
 * Abstract base class for payment strategies.
 * This defines the interface that all payment methods must implement.
 */
export abstract class PaymentStrategy {
  /**
   * Process a payment using the specific strategy.
   * 
   * @param amount - The amount to be paid
   * @param paymentDetails - Payment-specific details
   * @returns Result of the payment processing
   */
  abstract processPayment(amount: number, paymentDetails: PaymentDetails): PaymentResult;

  /**
   * Validate payment details for this specific strategy.
   * 
   * @param paymentDetails - Payment details to validate
   * @returns True if valid, False otherwise
   */
  abstract validatePaymentDetails(paymentDetails: PaymentDetails): boolean;
}
