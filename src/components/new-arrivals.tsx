'use client';
import { ArrowRight } from 'lucide-react';
import ProductCard from './product-card';
import { Button } from './ui/button';

const products = [
  {
    id: 1,
    image: '/products/1.jpg',
    name: 'T-shirt with Tape Details',
    price: 120,
    rating: 4.5,
  },
  {
    id: 2,
    image: '/products/2.jpg',
    name: 'Skinny Fit Jeans',
    price: 240,
    originalPrice: 260,
    rating: 3.5,
    discount: 20,
  },
  {
    id: 3,
    image: '/products/3.jpg',
    name: 'Checkered Shirt',
    price: 180,
    rating: 4.5,
  },
  {
    id: 4,
    image: '/products/4.jpg',
    name: 'Sleeve Striped T-shirt',
    price: 130,
    originalPrice: 160,
    rating: 4.5,
    discount: 30,
  },
  {
    id: 5,
    image: '/products/1.webp',
    name: 'Sleeve Striped T-shirt',
    price: 130,
    originalPrice: 160,
    rating: 4.5,
    discount: 30,
  },
];

const NewArrivals = () => {
  return (
    <section className="container flex flex-col gap-16 py-16">
      <div className="text-center">
        <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          New Arrivals
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Discover our latest collection of premium fashion essentials, crafted
          for the modern wardrobe.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        {products.map((product, index) => (
          <li key={index}>
            <ProductCard key={product.id} {...product} delay={index * 100} />
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        size="lg"
        className="group mx-auto gap-2 rounded-full"
      >
        View All Products
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </section>
  );
};

export default NewArrivals;
