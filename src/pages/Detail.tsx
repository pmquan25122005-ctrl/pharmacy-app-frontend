import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

import { useCart } from '../hooks/useCart';

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProductDetail(id);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl border border-slate-200 shadow-sm animate-pulse space-y-6">
        <div className="w-1/4 h-6 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-80 bg-slate-200 rounded-xl" />
          <div className="space-y-4">
            <div className="w-3/4 h-8 bg-slate-200 rounded" />
            <div className="w-1/3 h-6 bg-slate-200 rounded" />
            <div className="w-full h-24 bg-slate-100 rounded" />
            <div className="w-1/2 h-10 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-4">
        <span className="text-5xl mb-4 block">🔍</span>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">
          {error || 'The requested product details could not be retrieved from our inventory system.'}
        </p>
        <Link to="/">
          <Button variant="primary">← Back to Storefront</Button>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span>/</span>
        <Link to={`/${product.category.toLowerCase().includes('medicine') ? 'medicines' : 'devices'}`} className="hover:text-emerald-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Detail Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Product Image */}
        <div className="relative bg-slate-50 rounded-xl overflow-hidden border border-slate-100 aspect-square flex items-center justify-center">
          <img
            src={product.image || 'https://via.placeholder.com/400?text=Pharmacy+Product'}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="absolute top-3 left-3">
            <Badge variant="emerald">{product.category}</Badge>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Product SKU: PRD-{product.id}</p>
          </div>

          {/* Pricing & Stock Status */}
          <div className="flex items-baseline justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="text-xs text-slate-500 block">Unit Price</span>
              <span className="text-3xl font-extrabold text-emerald-600">
                ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              {isOutOfStock ? (
                <Badge variant="red">Out of Stock</Badge>
              ) : (
                <Badge variant="emerald">In Stock ({product.stock} items remaining)</Badge>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Product Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description || 'Certified healthcare product manufactured under strict medical quality guidelines.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={isOutOfStock}
              onClick={() => product && addToCart(product, 1)}
            >
              Add to Cart 🛒
            </Button>
            <Link to="/cart" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                View Shopping Cart
              </Button>
            </Link>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-500">
            <div className="flex items-center space-x-1.5">
              <span>🛡️</span>
              <span>100% Genuine Certified</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>🚚</span>
              <span>Fast Express Shipping</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Detail;
