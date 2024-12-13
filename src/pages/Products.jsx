import { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import SearchBar from '../components/products/SearchBar';
import api from '../utils/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch all products and categories from the backend using axios
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('http://localhost:5003/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  // Filter products based on selected filters and search term
  const filterProducts = ({ category, priceRange }) => {
    let filtered = [...products];

    // Apply category filter
    if (category && category !== 'all') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Apply price range filter
    if (priceRange && priceRange !== 'all') {
      filtered = filtered.filter((product) => {
        switch (priceRange) {
          case 'under-50':
            return product.price < 50;
          case '50-100':
            return product.price >= 50 && product.price <= 100;
          case 'over-100':
            return product.price > 100;
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    filterProducts({});
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64">
          <ProductFilters categories={categories} onFilterChange={filterProducts} />
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
