import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public getProducts(req: Request, res: Response): void {
        const products = this.productService.getAllProducts();
        res.render('productList', { products }); // Render the productList.ejs file with products
    }
    
    public getProductById(req: Request, res: Response): void {
        const product = this.productService.getProductById(req.params.id);
        if (product) {
            res.render('productDetail', { product }); // Render a product detail page if needed
        } else {
            res.status(404).send('Product not found');
        }
    }

    public searchProducts(req: Request, res: Response): void {
        const name = req.query.name as string; // Get the name from query parameters
        console.log(req.query);
        const products = this.productService.searchProductsByName(name);
        res.render('searchResults', { products }); // Render search results
    }

    public searchProductsBySku(req: Request, res: Response): void {
        const sku = req.query.name as string; // Get the name from query parameters
        console.log( req.query);
        const products = this.productService.searchProductsBySku(sku);
        res.render('searchResults', { products }); // Render search results
    }
}