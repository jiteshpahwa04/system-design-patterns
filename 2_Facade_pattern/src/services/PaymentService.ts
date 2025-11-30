export interface PaymentResult {
  success: boolean;
  transactionId: string | null;
  errorMessage?: string;
}

export interface PaymentMethod {
  type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';
  details: string;
}

export class PaymentService {
  public processPayment(amount: number, paymentMethod: PaymentMethod): PaymentResult {
    console.log(`Processing payment of $${amount} using ${paymentMethod.type}`);
    
    // Simulate payment processing
    const isSuccessful = this.simulatePaymentProcessing(amount, paymentMethod);
    
    if (isSuccessful) {
      const transactionId = this.generateTransactionId();
      console.log(`Payment successful! Transaction ID: ${transactionId}`);
      return {
        success: true,
        transactionId
      };
    } else {
      console.log('Payment failed!');
      return {
        success: false,
        transactionId: null,
        errorMessage: 'Payment processing failed'
      };
    }
  }

  private simulatePaymentProcessing(amount: number, paymentMethod: PaymentMethod): boolean {
    // Simulate different success rates based on payment method
    const successRates = {
      'CREDIT_CARD': 0.95,
      'DEBIT_CARD': 0.90,
      'PAYPAL': 0.98,
      'BANK_TRANSFER': 0.85
    };

    const successRate = successRates[paymentMethod.type];
    return Math.random() < successRate;
  }

  private generateTransactionId(): string {
    return 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

}
