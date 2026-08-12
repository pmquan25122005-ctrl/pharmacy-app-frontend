import axios from 'axios';
import { Product, CreateProductInput, UpdateProductInput } from '../types';

// Read API Base URL dynamically from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://6a48a300a033dcb98d64b8e2.mockapi.io/products';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for resiliency
});

/**
 * Fetch all products from REST API
 */
export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('');
  return response.data;
};

/**
 * Fetch single product by ID
 */
export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/${id}`);
  return response.data;
};

/**
 * Create a new product (Admin)
 */
export const createProduct = async (productData: CreateProductInput): Promise<Product> => {
  const response = await apiClient.post<Product>('', productData);
  return response.data;
};

/**
 * Update an existing product by ID (Admin)
 */
export const updateProduct = async (id: string, productData: UpdateProductInput): Promise<Product> => {
  const response = await apiClient.put<Product>(`/${id}`, productData);
  return response.data;
};

/**
 * Delete a product by ID (Admin)
 */
export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.delete<Product>(`/${id}`);
  return response.data;
};
