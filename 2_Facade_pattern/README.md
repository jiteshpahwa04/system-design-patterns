# E-commerce Facade Pattern Implementation

This project demonstrates the **Facade Pattern** using a TypeScript e-commerce system. The Facade pattern provides a simplified interface to a complex subsystem, making it easier to use and understand.

## 🎯 What is the Facade Pattern?

The Facade pattern is a structural design pattern that provides a simplified interface to a complex subsystem. It acts as a "front door" to a more complex underlying system, hiding its complexity from the client.

### Key Benefits:
- **Simplified Interface**: Provides a single, easy-to-use interface
- **Hides Complexity**: Encapsulates complex subsystem interactions
- **Reduces Coupling**: Client doesn't need to know about subsystem details
- **Easier Maintenance**: Changes to subsystem don't affect client code

## 🏗️ Project Structure

```
src/
├── domain/           # Core business entities
│   ├── Product.ts    # Product interface and implementation
│   ├── Customer.ts   # Customer interface and implementation
│   └── Order.ts      # Order interface and implementation
├── services/         # Subsystem services
│   ├── CatalogService.ts    # Product catalog management
│   ├── PaymentService.ts    # Payment processing
│   └── OrderService.ts      # Order management
├── facade/           # Facade implementation
│   └── OrderFacade.ts       # Main facade class
└── controller/       # Client interface
    └── OrderController.ts   # Controller using facade
```

## 🚀 How It Works

### Without Facade (Complex):
```typescript
// Client would need to handle all these steps manually:
1. Look up products in catalog
2. Validate product availability
3. Calculate order total
4. Process payment
5. Create order object
6. Save order to database
7. Handle all error cases
8. Update order status
```

### With Facade (Simple):
```typescript
// Client only needs one method call:
const result = await orderFacade.placeOrder(orderRequest);
```

## 📋 Key Components

### 1. Domain Models
- **Product**: Represents items in the catalog
- **Customer**: Represents buyers
- **Order**: Represents purchase orders with items and status

### 2. Subsystem Services
- **CatalogService**: Manages product catalog and availability
- **PaymentService**: Handles payment processing and refunds
- **OrderService**: Manages order creation, storage, and status updates

### 3. OrderFacade (The Star!)
The `OrderFacade` class is the main facade that simplifies the complex order placement process:

```typescript
public async placeOrder(request: PlaceOrderRequest): Promise<PlaceOrderResult>
```

This single method handles:
- ✅ Product validation and lookup
- ✅ Availability checking
- ✅ Total calculation
- ✅ Payment processing
- ✅ Order creation
- ✅ Order saving
- ✅ Status updates
- ✅ Error handling

### 4. OrderController
Demonstrates how simple it is to use the facade from a client perspective.

## 🛠️ Installation & Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Run the demo:**
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

## 🎮 Demo Scenarios

The demo showcases several scenarios:

1. **Successful Order**: Places an order with available products
2. **Unavailable Product**: Attempts to order out-of-stock items
3. **Invalid Product**: Tries to order non-existent products
4. **Order History**: Shows customer's order history
5. **Order Cancellation**: Demonstrates order cancellation

## 💡 Key Learning Points

### Facade Pattern Benefits:
1. **Simplification**: One method call instead of multiple complex operations
2. **Abstraction**: Hides subsystem complexity from clients
3. **Maintainability**: Changes to subsystem don't affect client code
4. **Testability**: Easier to test with simplified interface
5. **Flexibility**: Can change subsystem implementation without affecting clients

### When to Use Facade Pattern:
- ✅ You have a complex subsystem with many interdependent classes
- ✅ You want to provide a simple interface to a complex system
- ✅ You need to decouple client code from subsystem implementation
- ✅ You want to create a layered architecture

### When NOT to Use:
- ❌ The subsystem is already simple
- ❌ You need fine-grained control over subsystem operations
- ❌ Performance is critical and you can't afford the abstraction layer

## 🔍 Code Examples

### Using the Facade:
```typescript
const orderController = new OrderController();

const result = await orderController.placeOrder(
  'CUST_001',           // Customer ID
  'John Doe',           // Customer name
  'john@email.com',     // Email
  '123 Main St',        // Address
  ['1', '2'],           // Product IDs
  [1, 2],               // Quantities
  'CREDIT_CARD',        // Payment type
  '****-****-****-1234' // Payment details
);

if (result.success) {
  console.log(`Order placed: ${result.orderId}`);
} else {
  console.log(`Order failed: ${result.error}`);
}
```

### Without Facade (Complex):
```typescript
// This is what you'd have to do without the facade:
const catalogService = new CatalogService();
const paymentService = new PaymentService();
const orderService = new OrderService();

// Look up products
const products = productIds.map(id => catalogService.findProduct(id));
if (products.some(p => !p || !p.inStock)) {
  throw new Error('Some products unavailable');
}

// Calculate total
const total = products.reduce((sum, p, i) => sum + p.price * quantities[i], 0);

// Process payment
const paymentResult = paymentService.processPayment(total, paymentMethod);
if (!paymentResult.success) {
  throw new Error('Payment failed');
}

// Create and save order
const order = orderService.createOrder(customer, orderItems);
orderService.saveOrder(order);
orderService.updateOrderStatus(order.id, OrderStatus.CONFIRMED);
```

## 🎯 Conclusion

The Facade pattern is excellent for simplifying complex systems. In this e-commerce example, we've shown how a single `placeOrder()` method can replace dozens of lines of complex subsystem interactions, making the code more maintainable, testable, and easier to understand.

The pattern is particularly valuable in enterprise applications where you have complex subsystems that need to be accessed by multiple clients, and you want to provide a clean, simple interface while hiding the underlying complexity.
