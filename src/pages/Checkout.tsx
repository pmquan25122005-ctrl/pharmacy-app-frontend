import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCart } from '../hooks/useCart';
import { ShippingDetails, Order } from '../types';
import { Button } from '../components/common/Button';

const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
    .required('Phone number is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Shipping address is required'),
  paymentMethod: Yup.string()
    .oneOf(['cod', 'banking'], 'Please select a valid payment method')
    .required('Payment method is required'),
});

export const Checkout: React.FC = () => {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const shippingFee = cart.length > 0 ? 5.0 : 0.0;
  const grandTotal = totalPrice + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span className="text-5xl block">🛍️</span>
        <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">
          You must add items to your cart before proceeding to checkout.
        </p>
        <Link to="/">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const initialValues: ShippingDetails = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
  };

  const handleSubmit = (values: ShippingDetails) => {
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      items: [...cart],
      shippingDetails: values,
      totalAmount: grandTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    // Save order details to sessionStorage for the confirmation page
    sessionStorage.setItem('pharmacare_last_order', JSON.stringify(newOrder));
    
    // Clear global cart
    clearCart();

    // Navigate to order confirmation
    navigate('/confirmation', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Checkout & Order Placement</h1>
        <p className="text-sm text-slate-500 mt-1">Please enter your delivery details to complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Shipping Information Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <span>📦 Shipping & Recipient Details</span>
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Nguyễn Văn A"
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-xs text-red-500 mt-1 font-medium" />
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-1 font-medium" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="e.g. 0901234567"
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <ErrorMessage name="phone" component="div" className="text-xs text-red-500 mt-1 font-medium" />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <label htmlFor="address" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    rows={3}
                    id="address"
                    name="address"
                    placeholder="Enter full street address, ward, district, city..."
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <ErrorMessage name="address" component="div" className="text-xs text-red-500 mt-1 font-medium" />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <Field type="radio" name="paymentMethod" value="cod" className="text-emerald-600 focus:ring-emerald-500" />
                      <div className="ml-3">
                        <span className="text-sm font-semibold text-slate-900 block">💵 Cash on Delivery (COD)</span>
                        <span className="text-xs text-slate-500">Pay when receiving medication</span>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <Field type="radio" name="paymentMethod" value="banking" className="text-emerald-600 focus:ring-emerald-500" />
                      <div className="ml-3">
                        <span className="text-sm font-semibold text-slate-900 block">🏦 Bank Transfer</span>
                        <span className="text-xs text-slate-500">Fast QR Code Bank Transfer</span>
                      </div>
                    </label>

                  </div>
                  <ErrorMessage name="paymentMethod" component="div" className="text-xs text-red-500 mt-1 font-medium" />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full shadow-md"
                  >
                    Place Order & Confirm Order (${grandTotal.toFixed(2)})
                  </Button>
                </div>

              </Form>
            )}
          </Formik>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Summary ({totalItems})</span>
            <Link to="/cart" className="text-xs text-emerald-600 hover:underline">Edit Cart</Link>
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="pt-2 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 truncate max-w-[180px]">
                  <span className="font-semibold text-slate-900 truncate">{product.name}</span>
                  <span className="text-slate-400">x{quantity}</span>
                </div>
                <span className="font-bold text-slate-700">
                  ${(Number(product.price) * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee</span>
              <span className="font-semibold text-slate-900">${shippingFee.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
              <span className="font-bold text-slate-900">Total Due</span>
              <span className="text-2xl font-extrabold text-emerald-600">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;
