import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { getProductById } from '../services/api';

interface UseProductDetailResult {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProductDetail = (id?: string): UseProductDetailResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) {
      setError('Product ID is missing');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product details.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { product, isLoading, error, refetch: fetchDetail };
};
