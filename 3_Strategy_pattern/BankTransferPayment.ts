import { PaymentStrategy, PaymentResult, PaymentDetails } from './PaymentStrategy';

/**
 * Bank transfer payment details interface
 */
export interface BankTransferDetails extends PaymentDetails {
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
}

/**
 * Concrete strategy for processing bank transfer payments.
 */
export class BankTransferPayment extends PaymentStrategy {
  /**
   * Process bank transfer payment.
   */
  processPayment(amount: number, paymentDetails: PaymentDetails): PaymentResult {
    try {
      const details = paymentDetails as BankTransferDetails;
      const { accountNumber } = details;

      // Simulate processing time (bank transfers are slower)
      const startTime = Date.now();
      while (Date.now() - startTime < 500) {
        // Simulate network delay
      }

      // Simulate success/failure based on account number
      if (accountNumber.endsWith('999')) {
        return {
          success: false,
          message: 'Insufficient funds',
          transactionId: null,
          amount,
          paymentMethod: 'Bank Transfer'
        };
      }

      // Generate fake transaction ID
      const transactionId = `BT_${accountNumber.slice(-4)}_${Date.now()}`;

      return {
        success: true,
        message: 'Bank transfer initiated successfully',
        transactionId,
        amount,
        paymentMethod: 'Bank Transfer',
        accountLastFour: accountNumber.slice(-4),
        processingTime: '1-3 business days'
      };

    } catch (error) {
      return {
        success: false,
        message: `Bank transfer failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        transactionId: null,
        amount,
        paymentMethod: 'Bank Transfer'
      };
    }
  }

  /**
   * Validate bank transfer payment details.
   */
  validatePaymentDetails(paymentDetails: PaymentDetails): boolean {
    const details = paymentDetails as BankTransferDetails;
    const { accountNumber, routingNumber, accountHolderName } = details;

    // Check if all required fields are present
    if (!accountNumber || !routingNumber || !accountHolderName) {
      return false;
    }

    // Basic validation
    if (!/^\d{8,12}$/.test(accountNumber)) {
      return false;
    }

    if (!/^\d{9}$/.test(routingNumber)) {
      return false;
    }

    if (accountHolderName.trim().length < 2) {
      return false;
    }

    return true;
  }
}
