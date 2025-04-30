'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">Daftar Produk</h1>

      {loading ? (
        <p className="text-center text-gray-600">Memuat data produk...</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-purple-700 mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-900 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
