'use client';

import ProductView, {
  ProductViewSkeleton,
} from '@/modules/products/components/product-view';
import ProductsSection from '@/modules/products/components/products-section';
import Reviews from '@/modules/products/components/reviews';
import {
  useProductByIdQuery,
  useProductsQuery,
} from '@/modules/products/queries';
import { useTranslations } from 'next-intl';
import { notFound, useParams } from 'next/navigation';

const ProductDetails = () => {
  const t = useTranslations();
  const { id: productId } = useParams();
  const { data: productData, isLoading: isProductLoading } =
    useProductByIdQuery(productId as string);

  const productDetails = productData?.data.data;

  const { data, isLoading } = useProductsQuery();
  const products = data?.data.data || [];
  if (isProductLoading) return <ProductViewSkeleton />;
  if (!productDetails) return notFound();
  return (
    <div>
      <ProductView product={productDetails} />
      <Reviews />
      <ProductsSection
        title={t('Global.youMightAlsoLike')}
        description={t('Global.youMightAlsoLikeDescription')}
        products={products.slice(0, 4)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductDetails;
