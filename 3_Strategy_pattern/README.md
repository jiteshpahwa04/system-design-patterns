# Strategy Pattern - Payment Processing System (TypeScript)

## Overview

This project demonstrates the **Strategy Pattern** using a real-world example of an e-commerce payment processing system implemented in **TypeScript**. The Strategy Pattern is a behavioral design pattern that allows you to define a family of algorithms, encapsulate each one, and make them interchangeable.

## What is the Strategy Pattern?

The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

### Key Components:

1. **Strategy Interface** (`PaymentStrategy`): Defines the interface for all concrete strategies
2. **Concrete Strategies** (`CreditCardPayment`, `PayPalPayment`, `BankTransferPayment`): Implement specific algorithms
3. **Context** (`PaymentProcessor`): Uses a strategy to process payments
4. **Client** (`main.ts`): Demonstrates usage of the pattern

## Project Structure

```
3. Strategy Pattern/
├── PaymentStrategy.ts          # Abstract strategy interface with TypeScript types
├── CreditCardPayment.ts        # Concrete strategy for credit cards
├── PayPalPayment.ts           # Concrete strategy for PayPal
├── BankTransferPayment.ts     # Concrete strategy for bank transfers
├── PaymentProcessor.ts        # Context class
├── main.ts                    # Example usage and demonstration
├── package.json               # Node.js dependencies and scripts
├── tsconfig.json              # TypeScript compiler configuration
├── .eslintrc.json             # ESLint configuration for TypeScript
├── demo.html                  # Interactive demonstration page
└── README.md                  # This file
```

## How It Works

### 1. Strategy Interface
```typescript
export interface PaymentResult {
  success: boolean;
  message: string;
  transactionId: string | null;
  amount: number;
  paymentMethod: string;
  [key: string]: any; // Allow additional properties
}

export abstract class PaymentStrategy {
  abstract processPayment(amount: number, paymentDetails: PaymentDetails): PaymentResult;
  abstract validatePaymentDetails(paymentDetails: PaymentDetails): boolean;
}
```

### 2. Concrete Strategies
Each payment method implements the same interface but with different logic:

- **CreditCardPayment**: Validates card details and processes through card network
- **PayPalPayment**: Validates email/password and processes through PayPal API
- **BankTransferPayment**: Validates bank details and initiates ACH transfer

### 3. Context Class
```typescript
export class PaymentProcessor {
  private paymentStrategy: PaymentStrategy | null = null;

  constructor(paymentStrategy?: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy || null;
  }

  setPaymentStrategy(paymentStrategy: PaymentStrategy): void {
    this.paymentStrategy = paymentStrategy;
  }

  processPayment(amount: number, paymentDetails: PaymentDetails): PaymentResult {
    if (this.paymentStrategy === null) {
      throw new Error('No payment strategy set. Please set a payment strategy first.');
    }
    return this.paymentStrategy.processPayment(amount, paymentDetails);
  }
}
```

## Running the Example

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Mode (with ts-node)
```bash
npm run dev
```

### Build and Run
```bash
npm run build
npm start
```

### Available Scripts
- `npm run dev` - Run in development mode with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm run lint` - Run ESLint for code quality
- `npm run clean` - Remove compiled files

The program will demonstrate:
1. Processing payments with different strategies
2. Runtime strategy switching
3. Error handling with invalid payment details
4. The flexibility of the Strategy Pattern
5. TypeScript type safety and IntelliSense
6. Modern JavaScript/TypeScript features

## Benefits of the Strategy Pattern

### ✅ **Open/Closed Principle**
- Open for extension (new payment methods)
- Closed for modification (existing code doesn't change)

### ✅ **Runtime Flexibility**
- Switch strategies at runtime
- No need to recompile or restart

### ✅ **Clean Code**
- Each strategy is isolated
- Easy to test individual strategies
- Clear separation of concerns

### ✅ **Maintainability**
- Easy to add new payment methods
- Easy to modify existing strategies
- No complex conditional logic

### ✅ **TypeScript Benefits**
- **Type Safety**: Compile-time error checking prevents runtime errors
- **IntelliSense**: Better IDE support with autocomplete and suggestions
- **Refactoring**: Safe refactoring with type checking
- **Documentation**: Self-documenting code with type annotations
- **Interface Contracts**: Clear contracts between components

## Real-World Applications

The Strategy Pattern is commonly used in:

- **Payment Processing** (as shown in this example)
- **Sorting Algorithms** (QuickSort, MergeSort, BubbleSort)
- **Compression Algorithms** (ZIP, RAR, 7Z)
- **Navigation Systems** (Driving, Walking, Public Transport)
- **Game AI** (Different AI behaviors for NPCs)
- **Data Export** (CSV, JSON, XML formats)

## Comparison: With vs Without Strategy Pattern

### ❌ Without Strategy Pattern (Bad)
```typescript
function processPayment(paymentType: string, amount: number, details: any): any {
  if (paymentType === "credit_card") {
    // Credit card logic here
  } else if (paymentType === "paypal") {
    // PayPal logic here
  } else if (paymentType === "bank_transfer") {
    // Bank transfer logic here
  }
  // Adding new payment method requires modifying this function
}
```

### ✅ With Strategy Pattern (Good)
```typescript
const processor = new PaymentProcessor();
processor.setPaymentStrategy(new CreditCardPayment());
const result = processor.processPayment(amount, details);
// Adding new payment method: just create new strategy class
```

## Key Takeaways

1. **Encapsulate what varies**: Payment processing logic varies, so we encapsulate it
2. **Program to interfaces**: Use the `PaymentStrategy` interface, not concrete classes
3. **Composition over inheritance**: Use composition to combine strategies
4. **Runtime flexibility**: Change behavior without changing code structure
5. **Type safety**: TypeScript provides compile-time safety and better developer experience
6. **Interface contracts**: Clear contracts ensure consistent behavior across strategies

## Design Pattern Classification

- **Type**: Behavioral Design Pattern
- **Purpose**: Define a family of algorithms and make them interchangeable
- **Use When**: You have multiple ways to perform a task and want to choose at runtime

## Further Reading

- [Strategy Pattern - Wikipedia](https://en.wikipedia.org/wiki/Strategy_pattern)
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)
- [Head First Design Patterns](https://www.oreilly.com/library/view/head-first-design/0596007124/)


