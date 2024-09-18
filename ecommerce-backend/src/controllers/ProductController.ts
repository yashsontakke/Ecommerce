import { Request, Response } from 'express';
import { products } from '../data/products';

export class ProductController {
    public getProducts(req: Request, res: Response) {
        res.json(products);
    }

    public getProductById(req: Request, res: Response) {
        const product = products.find(p => p.id === req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    }
}