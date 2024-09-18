import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {ProductController} from "./controllers/ProductController"

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const productController = new ProductController();

app.get('/api/products', (req, res) => productController.getProducts(req, res));
app.get('/api/products/:id', (req, res) => productController.getProductById(req, res));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});