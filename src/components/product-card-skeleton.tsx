import { Skeleton } from '@ui/skeleton';

type Props = {
  delay?: number;
};

const ProductCardSkeleton = ({ delay = 0 }: Props) => {
  return (
    <article
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary">
        <Skeleton className="aspect-4/5 w-full" />
      </div>

      <div className="mt-4 space-y-2 px-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
