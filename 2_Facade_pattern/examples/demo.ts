import { OrderController } from '../src/controller/OrderController';

/**
 * Demo application showing the Facade Pattern in action
 * 
 * This demonstrates how the Facade pattern simplifies complex operations
 * by providing a unified interface to a set of interfaces in a subsystem.
 */
async function runDemo() {
  console.log('🛒 E-commerce Facade Pattern Demo\n');
  console.log('=' .repeat(50));

  const orderController = new OrderController();

  // Demo 1: Successful order placement
  console.log('\n🛍️  Demo 1: Placing a successful order...');
  const result1 = await orderController.placeOrder(
    'CUST_001',
    'John Doe',
    'john.doe@email.com',
    '123 Main St, City, State',
    ['1', '2'], // Laptop and Mouse
    [1, 2],     // 1 laptop, 2 mice
    'CREDIT_CARD',
    '****-****-****-1234'
  );

  if (result1.success) {
    console.log(`✅ Order placed successfully! Order ID: ${result1.orderId}`);
  } else {
    console.log(`❌ Order failed: ${result1.error}`);
  }

  // Demo 2: Order with unavailable product
  console.log('\n🛍️  Demo 2: Trying to order unavailable product...');
  const result2 = await orderController.placeOrder(
    'CUST_002',
    'Jane Smith',
    'jane.smith@email.com',
    '456 Oak Ave, City, State',
    ['4'], // Monitor (out of stock)
    [1],
    'PAYPAL',
    'jane.smith@email.com'
  );

  if (result2.success) {
    console.log(`✅ Order placed successfully! Order ID: ${result2.orderId}`);
  } else {
    console.log(`❌ Order failed: ${result2.error}`);
  }

  // Demo 3: Order with invalid product ID
  console.log('\n🛍️  Demo 3: Trying to order with invalid product ID...');
  const result3 = await orderController.placeOrder(
    'CUST_003',
    'Bob Johnson',
    'bob.johnson@email.com',
    '789 Pine St, City, State',
    ['999'], // Non-existent product
    [1],
    'DEBIT_CARD',
    '****-****-****-5678'
  );

  if (result3.success) {
    console.log(`✅ Order placed successfully! Order ID: ${result3.orderId}`);
  } else {
    console.log(`❌ Order failed: ${result3.error}`);
  }

  console.log('\n' + '=' .repeat(50));
  console.log('🎉 Demo completed!');
  console.log('\n💡 Key Benefits of the Facade Pattern:');
  console.log('   • Simplified interface to complex subsystem');
  console.log('   • Single method call handles multiple operations');
  console.log('   • Hides implementation details from client');
  console.log('   • Makes the system easier to use and understand');
  console.log('   • Reduces coupling between client and subsystem');
}

// Run the demo
runDemo().catch(console.error);
