export type ProductsResponse = {
  success: boolean;
  data: Array<Product>;
  pagination: Pagination;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  is_active: boolean;
  categories: Array<Category>;
  variants: Array<ProductVariant>;
  images: Record<
    string,
    Array<{
      id: string;
      urls: Record<'original' | 'large' | 'medium' | 'thumbnail', string>;
    }>
  >;
};

type Category = {
  id: string;
  name: string;
};

type ProductVariant = {
  id: string;
  size: string;
  color: string;
  stock: number;
};

type Pagination = {
  page: number;
  limit: number;
  total_pages: number;
  total_items: number;
};
