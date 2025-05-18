import { Request, Response } from 'express';
import { ProductModel, Product } from '../models/product.model';

export const ProductController = {
  getAllProducts: async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await ProductModel.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getProductById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
      }

      const product = await ProductModel.findById(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.error('Error in getProductById:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const productData: Product = req.body;
      
      // Basic validation
      if (!productData.name || !productData.price) {
        res.status(400).json({ message: 'Name and price are required' });
        return;
      }

      const newProduct = await ProductModel.create(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error in createProduct:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
      }

      const productData: Partial<Product> = req.body;
      const updatedProduct = await ProductModel.update(id, productData);
      
      if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found or no changes made' });
        return;
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error in updateProduct:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
      }

      const success = await ProductModel.delete(id);
      if (!success) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};