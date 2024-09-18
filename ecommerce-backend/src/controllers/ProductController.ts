import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public getProducts(req: Request, res: Response): void {
        const products = this.productService.getAllProducts();
        res.json(products);
    }

    public getProductById(req: Request, res: Response): void {
        const product = this.productService.getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    }

    public searchProducts(req: Request, res: Response): void {
        const name = req.query.name as string; // Get the name from query parameters
        const products = this.productService.searchProductsByName(name);
        res.render('searchResults', { products }); // Render search results
    }
}