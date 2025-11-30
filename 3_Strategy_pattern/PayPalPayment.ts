import { PaymentStrategy, PaymentResult, PaymentDetails } from './PaymentStrategy';

/**
 * PayPal payment details interface
 */
export interface PayPalDetails extends PaymentDetails {
  email: string;
  password: string;
}

/**
 * Concrete strategy for processing PayPal payments.
 */
export class PayPalPayment extends PaymentStrategy {
  /**
   * Process PayPal payment.
   */
  processPayment(amount: number, paymentDetails: PaymentDetails): PaymentResult {
    try {
      const details = paymentDetails as PayPalDetails;
      const { email } = details;

      // Simulate processing time (PayPal is slower)
      const startTime = Date.now();
      while (Date.now() - startTime < 200) {
        // Simulate network delay
      }

      // Simulate success/failure based on email
      if (email.toLowerCase().includes('invalid')) {
        return {
          success: false,
          message: 'Invalid PayPal account',
          transactionId: null,
          amount,
          paymentMethod: 'PayPal'
        };
      }

      // Generate fake transaction ID
      const emailPrefix = email.split('@')[0];
      const transactionId = `PP_${emailPrefix}_${Date.now()}`;

      return {
        success: true,
        message: 'PayPal payment processed successfully',
        transactionId,
        amount,
        paymentMethod: 'PayPal',
        paypalEmail: email
      };

    } catch (error) {
      return {
        success: false,
        message: `PayPal payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        transactionId: null,
        amount,
        paymentMethod: 'PayPal'
      };
    }
  }

  /**
   * Validate PayPal payment details.
   */
  validatePaymentDetails(paymentDetails: PaymentDetails): boolean {
    const details = paymentDetails as PayPalDetails;
    const { email, password } = details;

    // Check if all required fields are present
    if (!email || !password) {
      return false;
    }

    // Basic validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }

    return true;
  }
}
