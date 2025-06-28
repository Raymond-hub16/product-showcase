'use client'; // This is required because we're using useState and useEffect (client-side hooks)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component for optimization

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await res.json();
        setProducts(data);
        setFilteredProducts(data.slice(0, 5)); // Show initial 5 products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = products
      .filter((product) => product.title.toLowerCase().includes(lowerCaseSearchTerm))
      .slice(0, 5); // Still show only 5 results, even when searching
    setFilteredProducts(results);
  }, [searchTerm, products]); // Re-run when searchTerm or products change

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill" // Use fill for responsive image with parent control
                  objectFit="contain" // Ensures the image fits without cropping
                  className="rounded-t-lg"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate w-full px-2">
                {product.title}
              </h2>
              <Link
                href={`/products/${product.id}`}
                className="mt-auto px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-xl">
            No products found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}