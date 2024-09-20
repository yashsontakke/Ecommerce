import { Product } from '../entities/Product';
import { products } from '../data/products';

export class ProductService {
    public getAllProducts(): Product[] {
        return products;
    }

    public getProductById(id: string): Product | undefined {
        return products.find(product => product.id === id);
    }

    public searchProductsByName(name: string): Product[] {
        return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }
    public searchProductsBySku(sku: string): Product[] {
        return products.filter(product => product.sku.toLowerCase().includes(sku.toLowerCase()));
    }
}