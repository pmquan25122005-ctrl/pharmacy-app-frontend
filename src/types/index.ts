export type CategoryType = 'Medicine' | 'Medical Equipment' | 'Dermocosmetics' | 'General';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  image: string;
  description: string;
  stock: number;
  rating?: number;
  isFeatured?: boolean;
  createdAt?: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductFilterParams {
  category?: CategoryType | 'All';
  search?: string;
  sortBy?: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
  inStockOnly?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'cod' | 'banking';
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  totalAmount: number;
  createdAt: string;
  status: 'Pending' | 'Processing' | 'Completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
