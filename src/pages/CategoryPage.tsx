import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryType } from '../types';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ProductGrid } from '../components/product/ProductGrid';
import { Badge } from '../components/common/Badge';

interface CategoryPageProps {
  category: CategoryType;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { products, isLoading, error } = useProducts(category);
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial states from URL query parameters
  const initialSearch = searchParams.get('search') || '';
  const initialSort = (searchParams.get('sort') as 'default' | 'price-asc' | 'price-desc' | 'name-asc') || 'default';

  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>(initialSort);

  // Debounce search term to prevent rapid filter re-calculations while typing
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Sync debounced search & sort states back to URL query parameters
  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearchTerm.trim()) {
      params.search = debouncedSearchTerm.trim();
    }
    if (sortBy !== 'default') {
      params.sort = sortBy;
    }
    setSearchParams(params, { replace: true });
  }, [debouncedSearchTerm, sortBy, setSearchParams]);

  const categoryTitles: Record<CategoryType, { title: string; desc: string; badge: string }> = {
    Medicine: {
      title: 'Prescription & Over-The-Counter Medicines',
      desc: 'Genuine pharmaceutical items certified by licensed healthcare authorities.',
      badge: '💊 Medicines',
    },
    'Medical Equipment': {
      title: 'Medical Devices & Health Equipment',
      desc: 'Accurate home diagnostics, blood pressure monitors, and healthcare devices.',
      badge: '🩺 Equipment',
    },
    Dermocosmetics: {
      title: 'Dermatologist-Tested Dermocosmetics',
      desc: 'Premium skincare, sunscreens, and personal care tailored for sensitive skin.',
      badge: '✨ Cosmetics',
    },
    General: {
      title: 'Healthcare & Wellness Catalog',
      desc: 'Explore our full range of certified healthcare products.',
      badge: '🛍️ General',
    },
  };

  const currentCategoryInfo = categoryTitles[category] || categoryTitles.General;

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    if (sortBy === 'price-asc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, debouncedSearchTerm, sortBy]);

  return (
    <div className="space-y-8">
      
      {/* Category Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <Badge variant="emerald">{currentCategoryInfo.badge}</Badge>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {currentCategoryInfo.title}
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          {currentCategoryInfo.desc}
        </p>
      </div>

      {/* Control Bar: Search & Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative flex-grow max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder={`Search in ${category}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>

      </div>

      {/* Main Catalog View */}
      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          ⚠️ {error}
        </div>
      ) : (
        <ProductGrid
          products={filteredAndSortedProducts}
          isLoading={isLoading}
          emptyMessage={`No products found matching "${debouncedSearchTerm}". Try checking for spelling errors or clear search filter.`}
        />
      )}

    </div>
  );
};

export default CategoryPage;
