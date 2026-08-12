import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { getProducts } from '../services/api';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProducts = (categoryFilter?: string): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      
      if (categoryFilter && categoryFilter !== 'All') {
        const filterLower = categoryFilter.toLowerCase();
        const filtered = data.filter((p) => {
          const catLower = (p.category || '').toLowerCase();
          
          if (filterLower.includes('medicine')) {
            return catLower.includes('medicine') || catLower.includes('first aid') || catLower.includes('supplement');
          }
          if (filterLower.includes('device') || filterLower.includes('equipment')) {
            return catLower.includes('device') || catLower.includes('equipment') || catLower.includes('protection');
          }
          if (filterLower.includes('cosmetics') || filterLower.includes('skincare')) {
            return catLower.includes('cosmetics') || catLower.includes('skincare') || catLower.includes('personal care');
          }

          return catLower === filterLower;
        });
        setProducts(filtered);
      } else {
        setProducts(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setIsLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
};
