import { PaymentStrategy, PaymentResult, PaymentDetails } from './PaymentStrategy';

/**
 * Credit card payment details interface
 */
export interface CreditCardDetails extends PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

/**
 * Concrete strategy for processing credit card payments.
 */
export class CreditCardPayment extends PaymentStrategy {
  /**
   * Process credit card payment.
   */
  processPayment(amount: number, paymentDetails: PaymentDetails): PaymentResult {
    try {
      const details = paymentDetails as CreditCardDetails;
      const { cardNumber } = details;

      // Simulate processing time
      const startTime = Date.now();
      while (Date.now() - startTime < 100) {
        // Simulate network delay
      }

      // Simulate success/failure based on card number
      if (cardNumber.endsWith('0')) {
        return {
          success: false,
          message: 'Payment declined by bank',
          transactionId: null,
          amount,
          paymentMethod: 'Credit Card'
        };
      }

      // Generate fake transaction ID
      const transactionId = `CC_${cardNumber.slice(-4)}_${Date.now()}`;

      return {
        success: true,
        message: 'Payment processed successfully',
        transactionId,
        amount,
        paymentMethod: 'Credit Card',
        cardLastFour: cardNumber.slice(-4)
      };

    } catch (error) {
      return {
        success: false,
        message: `Payment processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        transactionId: null,
        amount,
        paymentMethod: 'Credit Card'
      };
    }
  }

  /**
   * Validate credit card payment details.
   */
  validatePaymentDetails(paymentDetails: PaymentDetails): boolean {
    const details = paymentDetails as CreditCardDetails;
    const { cardNumber, expiryDate, cvv } = details;

    // Check if all required fields are present
    if (!cardNumber || !expiryDate || !cvv) {
      return false;
    }

    // Basic validation
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      return false;
    }

    return true;
  }
}
