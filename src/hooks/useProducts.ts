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
        const filtered = data.filter(
          (p) => p.category?.toLowerCase() === categoryFilter.toLowerCase()
        );
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
