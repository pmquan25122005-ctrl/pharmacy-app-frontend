import React, { useMemo } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Order } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatCurrency } from '../utils/formatCurrency';

export const Confirmation: React.FC = () => {
  const location = useLocation();

  const order: Order | null = useMemo(() => {
    if (location.state?.order) {
      return location.state.order as Order;
    }
    try {
      const savedOrder = sessionStorage.getItem('pharmacare_last_order');
      return savedOrder ? JSON.parse(savedOrder) : null;
    } catch {
      return null;
    }
  }, [location.state]);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const { id, shippingDetails, items, totalAmount, createdAt } = order;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      
      {/* Success Badge Banner */}
      <div className="bg-emerald-600 text-white rounded-2xl p-8 text-center shadow-lg space-y-3">
        <span className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full text-3xl">
          🎉
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">Order Placed Successfully!</h1>
        <p className="text-emerald-100 text-sm max-w-md mx-auto">
          Thank you for choosing PharmaCare. Your order <span className="font-mono font-bold text-white">{id}</span> has been received and is being processed by our pharmacy team.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-2">
          <div>
            <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Order Reference</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{id}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Order Date</span>
            <span className="text-xs font-medium text-slate-700">
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Shipping Information Summary */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <span>📍 Shipping Details</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block">Recipient Name:</span>
              <span className="font-semibold text-slate-900">{shippingDetails.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Phone Number:</span>
              <span className="font-semibold text-slate-900">{shippingDetails.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Email Address:</span>
              <span className="font-semibold text-slate-900">{shippingDetails.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Payment Method:</span>
              <span className="font-semibold text-emerald-600 uppercase">
                {shippingDetails.paymentMethod === 'cod' ? '💵 Cash on Delivery (COD)' : '🏦 Bank Transfer'}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-400 block">Delivery Address:</span>
              <span className="font-semibold text-slate-900">{shippingDetails.address}</span>
            </div>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            📦 Purchased Items ({items.length})
          </h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs sm:text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-slate-900">{product.name}</span>
                  <Badge variant="slate">x{quantity}</Badge>
                </div>
                <span className="font-bold text-slate-800">
                  {formatCurrency(Number(product.price) * quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Payment Summary */}
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-800 block">Total Amount Paid</span>
            <span className="text-xs text-emerald-600">Includes all taxes and shipping</span>
          </div>
          <span className="text-2xl font-extrabold text-emerald-700">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Return to Catalog 🛍️
            </Button>
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Print Receipt 🖨️
          </button>
        </div>

      </div>

    </div>
  );
};

export default Confirmation;
