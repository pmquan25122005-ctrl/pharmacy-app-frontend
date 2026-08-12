import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatCurrency } from '../utils/formatCurrency';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const estimatedShipping = cart.length > 0 ? 5.0 : 0.0;
  const grandTotal = totalPrice + estimatedShipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span className="text-6xl block">🛒</span>
        <h2 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500">
          Looks like you haven't added any medicines or healthcare items to your shopping cart yet.
        </p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="lg">
              Explore Healthcare Products 💊
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-1">Review your items before proceeding to checkout</p>
        </div>
        <Badge variant="emerald">{totalItems} {totalItems === 1 ? 'item' : 'items'}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
            {cart.map(({ product, quantity }) => {
              const itemTotal = Number(product.price) * quantity;
              const isMaxStock = quantity >= product.stock;

              return (
                <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Thumbnail & Title */}
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <img
                      src={product.image || 'https://via.placeholder.com/100'}
                      alt={product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-100 bg-slate-50 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <div className="space-y-1">
                      <Link to={`/detail/${product.id}`} className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1 text-sm sm:text-base">
                        {product.name}
                      </Link>
                      <div className="flex items-center space-x-2">
                        <Badge variant="slate">{product.category}</Badge>
                        <span className="text-xs text-slate-400">
                          {formatCurrency(product.price)} each
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Controls: Quantity & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold text-slate-900 text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={isMaxStock}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[80px]">
                      <span className="text-xs text-slate-400 block sm:hidden">Total</span>
                      <span className="font-bold text-slate-900 text-base">
                        {formatCurrency(itemTotal)}
                      </span>
                    </div>

                    {/* Remove item button */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove item"
                    >
                      🗑️
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-800 font-medium hover:underline flex items-center space-x-1"
            >
              <span>Clear Shopping Cart</span>
            </button>
            <Link to="/" className="text-xs text-emerald-600 hover:text-emerald-800 font-medium hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal ({totalItems})</span>
              <span className="font-semibold text-slate-900">{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-900">{formatCurrency(estimatedShipping)}</span>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Grand Total</span>
              <span className="text-2xl font-extrabold text-emerald-600">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full shadow-md"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout 💳
          </Button>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800 space-y-1">
            <p className="font-semibold">🔒 Safe & Secure Checkout</p>
            <p>Certified products guaranteed by licensed pharmacy standards.</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;
