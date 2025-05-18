import db from '../config/db.config';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at?: Date;
}

export const ProductModel = {
  findAll: async (): Promise<Product[]> => {
    try {
      const result = await db.query('SELECT * FROM products ORDER BY id ASC');
      return result.rows;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  findById: async (id: number): Promise<Product | null> => {
    try {
      const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`Error getting product with id ${id}:`, error);
      throw error;
    }
  },

  create: async (product: Product): Promise<Product> => {
    try {
      const { name, description, price, stock } = product;
      const result = await db.query(
        'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, stock]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  update: async (id: number, product: Partial<Product>): Promise<Product | null> => {
    try {
      // Build dynamic query based on provided fields
      const entries = Object.entries(product).filter(([_, value]) => value !== undefined);
      if (!entries.length) return null;

      const setClause = entries
        .map(([key, _], index) => `${key} = $${index + 1}`)
        .join(', ');

      const values = entries.map(([_, value]) => value);
      values.push(id);

      const result = await db.query(
        `UPDATE products SET ${setClause} WHERE id = $${values.length} RETURNING *`,
        values
      );
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
};