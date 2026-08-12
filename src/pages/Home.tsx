import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getProducts } from '@/services/api';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/common/Button';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        // Display first 8 products on home page
        setFeaturedProducts(data.slice(0, 8));
      } catch (err: any) {
        setError(err.message || 'Failed to load featured products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="space-y-12">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 md:p-12 shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-block px-3 py-1 bg-emerald-500/30 backdrop-blur-sm border border-emerald-300/30 text-emerald-100 rounded-full text-xs font-semibold uppercase tracking-wider">
            Verified Healthcare Partner 🏥
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Your Health & Wellness, Delivered Fast
          </h1>
          <p className="text-emerald-100 text-base md:text-lg">
            Order genuine prescription medicines, medical equipment, and dermocosmetics online with verified pharmacist guidance.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link to="/medicines">
              <Button variant="secondary" size="lg">
                Explore Medicines 💊
              </Button>
            </Link>
            <Link to="/devices">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-emerald-700">
                Medical Equipment 🩺
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Quick Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link to="/medicines" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all">
            <span className="text-3xl mb-2 block">💊</span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Medicines
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Over-the-counter and prescription medical products for standard care.
            </p>
          </Link>

          <Link to="/devices" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
            <span className="text-3xl mb-2 block">🩺</span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Medical Equipment
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Blood pressure monitors, thermometers, test kits, and mobility aids.
            </p>
          </Link>

          <Link to="/cosmetics" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all">
            <span className="text-3xl mb-2 block">✨</span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Dermocosmetics
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Dermatologist-tested skincare, sun protection, and personal care.
            </p>
          </Link>

        </div>
      </section>

      {/* Featured Products Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Featured Products</h2>
            <p className="text-sm text-slate-500">Popular items trusted by our customers</p>
          </div>
          <Link to="/medicines">
            <Button variant="outline" size="sm">
              View All Catalog →
            </Button>
          </Link>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {error}
          </div>
        ) : (
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        )}
      </section>

      {/* Store Value Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
        <div className="flex items-start space-x-3">
          <span className="text-2xl p-2 bg-emerald-100 rounded-lg text-emerald-600">🛡️</span>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">100% Genuine Guarantee</h4>
            <p className="text-xs text-slate-500">Sourced directly from licensed pharmaceutical distributors.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <span className="text-2xl p-2 bg-emerald-100 rounded-lg text-emerald-600">🚚</span>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Express 2-Hour Delivery</h4>
            <p className="text-xs text-slate-500">Urgent medication delivered right to your door.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <span className="text-2xl p-2 bg-emerald-100 rounded-lg text-emerald-600">👨‍⚕️</span>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Expert Pharmacist Support</h4>
            <p className="text-xs text-slate-500">Free dosage guidance and online health consultation.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
