import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt ,{ JwtPayload }from 'jsonwebtoken';

import { ProductController } from './controllers/ProductController';
import path from 'path';
import { generateToken } from './utils/jwtUtils'; // Adjust the path as necessary


const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form-urlencoded data
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Extend Request to include 'user'
interface AuthenticatedRequest extends express.Request {
  user?: string | JwtPayload; // or specific type depending on your payload structure
}
const productController = new ProductController();

// Middleware for JWT Token Validation
const validateToken =(req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey', (err, payload) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token',
        });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Token is not provided',
    });
  }
};

// Hardcoded User Data (In a real-world scenario, this would be retrieved from a database)
const user = {
  id: 1,
  username: 'abc',
  password: 'abc',
};

app.get('/login', (req: AuthenticatedRequest, res: express.Response)=> {
  res.render('login', { user: req.user }); // Pass the user object to the template
});
// Login Route
app.post('/auth/login',  (req: AuthenticatedRequest, res: express.Response) => {
  const { username, password } = req.body;

  // Check if username and password match
  if (username === user.username && password === user.password) {
    // Generate JWT token
    const token = generateToken({ id: user.id, username: user.username });

    res.render('index', { user: req.body.username }); // Pass the entire user object
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password',
    });
  }
});

// Protected Route
app.get('/protected', validateToken,  (req: AuthenticatedRequest, res: express.Response) => {
  res.json({
    success: true,
    message: 'Welcome to the protected route!',
    user: req.user,
  });
});

// Serve the landing page on the root route
app.get('/', (req: AuthenticatedRequest, res: express.Response) => {
  res.render('index', { user: req.user }); // Pass the user object to the template
});


// API routes
app.get('/api/products', (req, res) => productController.getProducts(req, res));
app.get('/api/products/:id', (req, res) => productController.getProductById(req, res));
app.get('/search', (req, res) => productController.searchProducts(req, res));
app.get('/searchbysku', (req, res) => productController.searchProductsBySku(req, res));

app.get('/search', (req, res) => productController.searchProducts(req, res));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});