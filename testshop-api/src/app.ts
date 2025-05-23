import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware logujące
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
console.log('Setting up routes...');

console.log('Products routes set up');

console.log('Auth routes set up');

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/test-auth', (req, res) => {
  console.log('Test auth endpoint hit', req.body);
  res.status(200).json({ message: 'Test auth endpoint working', body: req.body });
});

// Add root path handler
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'TestShop API is running',
    endpoints: {
      products: '/api/products',
      auth: '/api/auth',
      health: '/health',
      testAuth: '/test-auth'
    }
  });
});

// Error handler for non-existent routes
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error', 
    message: `Path not found: ${req.method} ${req.url}`,
    availableEndpoints: {
      products: '/api/products',
      auth: '/api/auth',
      health: '/health',
      testAuth: '/test-auth'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;