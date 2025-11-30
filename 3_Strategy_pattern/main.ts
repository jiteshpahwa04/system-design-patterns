#!/usr/bin/env node

/**
 * Main application demonstrating the Strategy Pattern with a payment processing system.
 * This example shows how different payment methods can be processed using the same interface.
 */

import { PaymentProcessor } from './PaymentProcessor';
import { CreditCardPayment, CreditCardDetails } from './CreditCardPayment';
import { PayPalPayment, PayPalDetails } from './PayPalPayment';
import { BankTransferPayment, BankTransferDetails } from './BankTransferPayment';
import { PaymentResult } from './PaymentStrategy';

/**
 * Print a formatted separator with title.
 */
function printSeparator(title: string): void {
  console.log('\n' + '='.repeat(60));
  console.log(` ${title}`);
  console.log('='.repeat(60));
}

/**
 * Print payment result in a formatted way.
 */
function printPaymentResult(result: PaymentResult): void {
  const status = result.success ? '✅ SUCCESS' : '❌ FAILED';
  console.log(`Status: ${status}`);
  console.log(`Message: ${result.message}`);
  console.log(`Amount: $${result.amount.toFixed(2)}`);
  console.log(`Payment Method: ${result.paymentMethod}`);
  
  if (result.transactionId) {
    console.log(`Transaction ID: ${result.transactionId}`);
  }
  
  if ('cardLastFour' in result) {
    console.log(`Card Last Four: ****${result.cardLastFour}`);
  }
  
  if ('paypalEmail' in result) {
    console.log(`PayPal Email: ${result.paypalEmail}`);
  }
  
  if ('accountLastFour' in result) {
    console.log(`Account Last Four: ****${result.accountLastFour}`);
  }
  
  if ('processingTime' in result) {
    console.log(`Processing Time: ${result.processingTime}`);
  }
}

/**
 * Main function demonstrating the Strategy Pattern.
 */
function main(): void {
  printSeparator('STRATEGY PATTERN DEMONSTRATION');
  console.log('E-commerce Payment Processing System');
  console.log('\nThis example demonstrates how the Strategy Pattern allows us to:');
  console.log('• Use different payment methods with the same interface');
  console.log('• Switch payment strategies at runtime');
  console.log('• Add new payment methods without changing existing code');

  // Create payment processor
  const processor = new PaymentProcessor();

  // Example 1: Credit Card Payment
  printSeparator('EXAMPLE 1: CREDIT CARD PAYMENT');

  // Set credit card strategy
  processor.setPaymentStrategy(new CreditCardPayment());
  console.log(`Current Strategy: ${processor.getCurrentStrategy()}`);

  // Credit card payment details
  const creditCardDetails: CreditCardDetails = {
    cardNumber: '1234567890123456',
    expiryDate: '12/25',
    cvv: '123'
  };

  console.log('\nProcessing Credit Card Payment...');
  console.log(`Card Number: ****${creditCardDetails.cardNumber.slice(-4)}`);
  console.log(`Expiry: ${creditCardDetails.expiryDate}`);

  const result1 = processor.processPayment(99.99, creditCardDetails);
  printPaymentResult(result1);

  // Example 2: PayPal Payment
  printSeparator('EXAMPLE 2: PAYPAL PAYMENT');

  // Switch to PayPal strategy
  processor.setPaymentStrategy(new PayPalPayment());
  console.log(`Current Strategy: ${processor.getCurrentStrategy()}`);

  // PayPal payment details
  const paypalDetails: PayPalDetails = {
    email: 'user@example.com',
    password: 'securepassword123'
  };

  console.log('\nProcessing PayPal Payment...');
  console.log(`Email: ${paypalDetails.email}`);

  const result2 = processor.processPayment(149.50, paypalDetails);
  printPaymentResult(result2);

  // Example 3: Bank Transfer Payment
  printSeparator('EXAMPLE 3: BANK TRANSFER PAYMENT');

  // Switch to bank transfer strategy
  processor.setPaymentStrategy(new BankTransferPayment());
  console.log(`Current Strategy: ${processor.getCurrentStrategy()}`);

  // Bank transfer payment details
  const bankDetails: BankTransferDetails = {
    accountNumber: '1234567890',
    routingNumber: '123456789',
    accountHolderName: 'John Doe'
  };

  console.log('\nProcessing Bank Transfer Payment...');
  console.log(`Account: ****${bankDetails.accountNumber.slice(-4)}`);
  console.log(`Routing: ${bankDetails.routingNumber}`);
  console.log(`Account Holder: ${bankDetails.accountHolderName}`);

  const result3 = processor.processPayment(299.99, bankDetails);
  printPaymentResult(result3);

  // Example 4: Error Handling - Invalid Payment Details
  printSeparator('EXAMPLE 4: ERROR HANDLING');

  console.log('Testing with invalid credit card details...');
  processor.setPaymentStrategy(new CreditCardPayment());

  const invalidDetails: CreditCardDetails = {
    cardNumber: '1234', // Too short
    expiryDate: '12/25',
    cvv: '123'
  };

  const result4 = processor.processPayment(50.00, invalidDetails);
  printPaymentResult(result4);

  // Example 5: Runtime Strategy Switching
  printSeparator('EXAMPLE 5: RUNTIME STRATEGY SWITCHING');

  console.log('Demonstrating how strategies can be switched at runtime...');

  // Process same payment with different strategies
  const amount = 75.00;
  const validCcDetails: CreditCardDetails = {
    cardNumber: '9876543210987654',
    expiryDate: '06/26',
    cvv: '456'
  };

  const strategies = [
    { strategy: new CreditCardPayment(), name: 'Credit Card', details: validCcDetails },
    { strategy: new PayPalPayment(), name: 'PayPal', details: paypalDetails },
    { strategy: new BankTransferPayment(), name: 'Bank Transfer', details: bankDetails }
  ];

  for (const { strategy, name, details } of strategies) {
    processor.setPaymentStrategy(strategy);
    console.log(`\nProcessing $${amount.toFixed(2)} with ${name}...`);

    const result = processor.processPayment(amount, details);
    printPaymentResult(result);
  }

  printSeparator('DEMONSTRATION COMPLETE');
  console.log('Key Benefits of Strategy Pattern:');
  console.log('• ✅ Easy to add new payment methods');
  console.log('• ✅ Runtime strategy switching');
  console.log('• ✅ Clean separation of concerns');
  console.log('• ✅ No need to modify existing code when adding new strategies');
  console.log('• ✅ Each strategy can have its own validation and processing logic');
  console.log('• ✅ Type safety with TypeScript interfaces');
  console.log('• ✅ Better IDE support with autocomplete and error checking');
}

// Run the main function
if (require.main === module) {
  main();
}
