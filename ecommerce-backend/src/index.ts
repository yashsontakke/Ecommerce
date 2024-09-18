import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ProductController } from './controllers/ProductController';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

const productController = new ProductController();

// Serve the landing page on the root route
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

// API routes
app.get('/api/products', (req, res) => productController.getProducts(req, res));
app.get('/api/products/:id', (req, res) => productController.getProductById(req, res));

app.get('/search', (req, res) => productController.searchProducts(req, res));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});