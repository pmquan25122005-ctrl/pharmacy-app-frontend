import React, { useState, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Product, CreateProductInput, CategoryType } from '../../types';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/api';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Product name must be at least 2 characters')
    .required('Product name is required'),
  category: Yup.string()
    .oneOf(['Medicine', 'Medical Equipment', 'Dermocosmetics', 'General'], 'Select a valid category')
    .required('Category is required'),
  price: Yup.number()
    .positive('Price must be greater than 0')
    .required('Price is required'),
  stock: Yup.number()
    .min(0, 'Stock cannot be negative')
    .required('Stock quantity is required'),
  image: Yup.string()
    .url('Must be a valid image URL')
    .required('Product image URL is required'),
  description: Yup.string()
    .min(5, 'Description must be at least 5 characters')
    .required('Description is required'),
});

export const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load inventory data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Filtered product list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Inventory stats
  const totalStockCount = useMemo(() => {
    return products.reduce((sum, p) => sum + Number(p.stock), 0);
  }, [products]);

  const lowStockCount = useMemo(() => {
    return products.filter((p) => Number(p.stock) <= 5).length;
  }, [products]);

  // Modal Open Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Submit Handler for Add / Edit
  const handleSubmitProduct = async (values: CreateProductInput) => {
    try {
      setIsActionLoading(true);
      if (editingProduct) {
        // UPDATE API call
        const updated = await updateProduct(editingProduct.id, values);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updated : p))
        );
      } else {
        // CREATE API call
        const created = await createProduct(values);
        setProducts((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err: any) {
      alert(`Action failed: ${err.message}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Submit Handler for Delete
  const ConfirmDeleteProduct = async () => {
    if (!deletingProduct) return;
    try {
      setIsActionLoading(true);
      await deleteProduct(deletingProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center space-x-2">
            <span>⚙️ Admin Inventory Portal</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage product catalog, stock levels, unit prices, and REST API records
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAddModal} className="shadow-sm">
          + Add New Product
        </Button>
      </div>

      {/* Inventory Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <span className="p-3 bg-emerald-100 text-emerald-600 text-2xl rounded-xl">📦</span>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Catalog</span>
            <span className="text-2xl font-extrabold text-slate-900">{products.length} Products</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <span className="p-3 bg-blue-100 text-blue-600 text-2xl rounded-xl">📊</span>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Stock Items</span>
            <span className="text-2xl font-extrabold text-slate-900">{totalStockCount} Units</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <span className="p-3 bg-amber-100 text-amber-600 text-2xl rounded-xl">⚠️</span>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Low Stock Alert</span>
            <span className="text-2xl font-extrabold text-amber-600">{lowStockCount} Items</span>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-grow max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search inventory by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="catFilter" className="text-xs font-semibold text-slate-500">
            Category:
          </label>
          <select
            id="catFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Categories</option>
            <option value="Medicine">Medicine</option>
            <option value="Medical Equipment">Medical Equipment</option>
            <option value="Dermocosmetics">Dermocosmetics</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          ⚠️ {error}
        </div>
      ) : isLoading ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <div className="animate-spin text-3xl mb-2">⏳</div>
          <p className="text-sm text-slate-500">Loading inventory records from REST API...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Unit Price</th>
                  <th className="p-4">Stock Level</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No products found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const isLowStock = Number(product.stock) <= 5;
                    const isOutOfStock = Number(product.stock) <= 0;

                    return (
                      <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                        
                        {/* Product Thumbnail & Name */}
                        <td className="p-4 flex items-center space-x-3">
                          <img
                            src={product.image || 'https://via.placeholder.com/50'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg border border-slate-200 bg-slate-50 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=100&q=80';
                            }}
                          />
                          <div>
                            <span className="font-semibold text-slate-900 block truncate max-w-xs">{product.name}</span>
                            <span className="text-xs text-slate-400 font-mono">ID: {product.id}</span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-4">
                          <Badge variant="emerald">{product.category}</Badge>
                        </td>

                        {/* Unit Price */}
                        <td className="p-4 font-bold text-slate-900">
                          {formatCurrency(product.price)}
                        </td>

                        {/* Stock Badge */}
                        <td className="p-4">
                          {isOutOfStock ? (
                            <Badge variant="red">Out of Stock (0)</Badge>
                          ) : isLowStock ? (
                            <Badge variant="amber">Low Stock ({product.stock})</Badge>
                          ) : (
                            <Badge variant="emerald">In Stock ({product.stock})</Badge>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="p-4 text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEditModal(product)}
                          >
                            Edit ✏️
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setDeletingProduct(product)}
                          >
                            Delete 🗑️
                          </Button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                {editingProduct ? '✏️ Edit Product' : '+ Add New Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <Formik
              initialValues={{
                name: editingProduct?.name || '',
                category: (editingProduct?.category as CategoryType) || 'Medicine',
                price: editingProduct?.price || 10.0,
                stock: editingProduct?.stock || 50,
                image: editingProduct?.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
                description: editingProduct?.description || '',
              }}
              validationSchema={ProductSchema}
              onSubmit={handleSubmitProduct}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 text-sm">
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Product Name *
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g. Paracetamol 500mg"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <ErrorMessage name="name" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>

                  {/* Category & Price Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Category *
                      </label>
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="Medicine">Medicine</option>
                        <option value="Medical Equipment">Medical Equipment</option>
                        <option value="Dermocosmetics">Dermocosmetics</option>
                        <option value="General">General</option>
                      </Field>
                      <ErrorMessage name="category" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Unit Price ($) *
                      </label>
                      <Field
                        type="number"
                        step="0.01"
                        id="price"
                        name="price"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <ErrorMessage name="price" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>
                  </div>

                  {/* Stock & Image Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="stock" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Stock Quantity *
                      </label>
                      <Field
                        type="number"
                        id="stock"
                        name="stock"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <ErrorMessage name="stock" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Image URL *
                      </label>
                      <Field
                        type="text"
                        id="image"
                        name="image"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs"
                      />
                      <ErrorMessage name="image" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Description *
                    </label>
                    <Field
                      as="textarea"
                      rows={3}
                      id="description"
                      name="description"
                      placeholder="Product details, dosage guidelines, or medical specifications..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <ErrorMessage name="description" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>

                  <div className="pt-3 flex justify-end space-x-3 border-t border-slate-100">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting || isActionLoading}
                    >
                      {editingProduct ? 'Save Changes' : 'Create Product'}
                    </Button>
                  </div>

                </Form>
              )}
            </Formik>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL POPUP */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center space-x-3 text-red-600">
              <span className="text-3xl">⚠️</span>
              <h3 className="text-lg font-bold text-slate-900">Confirm Product Deletion</h3>
            </div>
            
            <p className="text-sm text-slate-600">
              Are you sure you want to delete <span className="font-bold text-slate-900">{deletingProduct.name}</span> (ID: {deletingProduct.id})? This action will remove the record from the REST API permanently.
            </p>

            <div className="pt-3 flex justify-end space-x-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="md"
                onClick={() => setDeletingProduct(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                isLoading={isActionLoading}
                onClick={ConfirmDeleteProduct}
              >
                Confirm Delete 🗑️
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
