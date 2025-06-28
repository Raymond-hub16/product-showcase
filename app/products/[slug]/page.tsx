'use client'; // This is required for useState and useEffect


import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

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

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params; // Get the product ID from the URL (slug is the dynamic part)
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: Product = await res.json();
        setProduct(data);

        // Check if product is in favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(data.id));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) { // Only fetch if slug is available
      fetchProduct();
    }
  }, [slug]); // Re-run effect if slug changes

  const handleToggleFavorite = () => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let updatedFavorites;
      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = favorites.filter((id: number) => id !== product.id);
      } else {
        // Add to favorites
        updatedFavorites = [...favorites, product.id];
      }
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite); // Toggle the favorite status
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500 text-xl">
        Product not found.
        <br />
        <Link
          href="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-xl mt-10">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block text-lg"
      >
        &larr; Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative w-full md:w-1/3 h-80 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden p-4">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product.title}
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            <strong className="font-semibold">Category:</strong>{' '}
            {product.category}
          </p>
          <p className="text-3xl font-bold text-blue-700 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-800 leading-relaxed mb-6">
            {product.description}
          </p>
          <p className="text-gray-600 text-lg mb-6">
            <strong className="font-semibold">Rating:</strong>{' '}
            <span className="text-yellow-500">{product.rating.rate}</span> (
            {product.rating.count} reviews)
          </p>

          <button
            onClick={handleToggleFavorite}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 shadow-md ${
              isFavorite
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
}