import Image from 'next/image';
import Link from 'next/link';

export function ProductRecommendations() {
  const recommendations = [
    {
      id: 1,
      name: 'Related Product 1',
      price: 1500,
      image: '/placeholder.jpg',
    },
    {
      id: 2,
      name: 'Related Product 2',
      price: 2000,
      image: '/placeholder.jpg',
    },
    {
      id: 3,
      name: 'Related Product 3',
      price: 1800,
      image: '/placeholder.jpg',
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            <p className="text-sm font-medium text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-600">৳{product.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
