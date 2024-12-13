import { useState } from 'react';

export default function ProductFilters({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ category, priceRange });
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    onFilterChange({ category: selectedCategory, priceRange: range });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          <button
            className={`block w-full text-left px-3 py-2 rounded ${
              selectedCategory === 'all' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleCategoryChange('all')}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === category ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="space-y-2">
          {[
            { label: 'All Prices', value: 'all' },
            { label: 'Under $50', value: 'under-50' },
            { label: '$50 - $100', value: '50-100' },
            { label: 'Over $100', value: 'over-100' },
          ].map((range) => (
            <button
              key={range.value}
              className={`block w-full text-left px-3 py-2 rounded ${
                priceRange === range.value ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => handlePriceRangeChange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}