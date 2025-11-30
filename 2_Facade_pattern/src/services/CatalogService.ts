import { Product, ProductImpl } from '../domain/Product';

export class CatalogService {
  private products: Map<string, Product> = new Map();

  constructor() {
    // Initialize with some sample products
    this.initializeProducts();
  }

  private initializeProducts(): void {
    const sampleProducts: Product[] = [
      new ProductImpl('1', 'Laptop', 999.99, 'High-performance laptop', true),
      new ProductImpl('2', 'Mouse', 29.99, 'Wireless optical mouse', true),
      new ProductImpl('3', 'Keyboard', 79.99, 'Mechanical gaming keyboard', true),
      new ProductImpl('4', 'Monitor', 299.99, '27-inch 4K monitor', false),
      new ProductImpl('5', 'Headphones', 149.99, 'Noise-cancelling headphones', true)
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  public findProduct(productId: string): Product | null {
    const product = this.products.get(productId);
    return product || null;
  }

  public isProductAvailable(productId: string): boolean {
    const product = this.findProduct(productId);
    return product ? product.inStock : false;
  }

}
