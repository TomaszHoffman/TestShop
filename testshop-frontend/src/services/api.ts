import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = 'http://localhost:3001/api';

console.log('API_URL:', API_URL); 

export const api = {
  // Pobieranie wszystkich produktów
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get('http://localhost:3001/api/products');
    return response.data;
  },

  // Pobieranie produktu po ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  // Tworzenie nowego produktu
  createProduct: async (product: Product): Promise<Product> => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  },

  // Aktualizacja produktu
  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
  },

  // Usuwanie produktu
  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/products/${id}`);
  }
};