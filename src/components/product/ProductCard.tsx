import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock <= 0;

  const categoryBadgeVariant = (cat: string) => {
    switch (cat) {
      case 'Medicine':
        return 'emerald';
      case 'Medical Equipment':
        return 'blue';
      case 'Dermocosmetics':
        return 'amber';
      default:
        return 'slate';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Image container */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden group">
        <img
          src={product.image || 'https://via.placeholder.com/300x200?text=Product'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80';
          }}
        />
        {/* Stock overlay tag */}
        <div className="absolute top-2 right-2">
          {isOutOfStock ? (
            <Badge variant="red">Out of Stock</Badge>
          ) : (
            <Badge variant="emerald">In Stock ({product.stock})</Badge>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <div className="mb-1">
            <Badge variant={categoryBadgeVariant(product.category)}>{product.category}</Badge>
          </div>
          
          <Link to={`/detail/${product.id}`} className="block group">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {product.description || 'Genuine healthcare product supplied with guaranteed quality.'}
          </p>
        </div>

        {/* Footer Area: Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Price</span>
            <span className="text-lg font-bold text-emerald-600">
              ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex space-x-2">
            <Link to={`/detail/${product.id}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            {onAddToCart && (
              <Button
                variant="primary"
                size="sm"
                disabled={isOutOfStock}
                onClick={() => onAddToCart(product)}
              >
                Add 🛒
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

