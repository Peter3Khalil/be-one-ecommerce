'use client';
import { useProducts } from '@/modules/products/queries';
import Hero from '@components/hero';
import ProductsSection from '@components/products-section';
import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations();
  const { data, isLoading } = useProducts();
  const products = data?.data.data || [];
  return (
    <div>
      <Hero />
      <ProductsSection
        title={t('Global.newArrivals')}
        description={t('Global.newArrivalsDescription')}
        products={products.slice(0, 4)}
        isLoading={isLoading}
      />
      <ProductsSection
        title={t('Global.topSelling')}
        description={t('Global.topSellingDescription')}
        products={products.slice(0, 4)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
