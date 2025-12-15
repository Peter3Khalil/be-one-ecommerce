import { CheckCircle2 } from 'lucide-react';
import Rating from './rating';

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
  date: string;
  verified?: boolean;
}

const ReviewCard = ({
  name,
  rating,
  review,
  date,
  verified = false,
}: ReviewCardProps) => {
  return (
    <article className="flex flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <Rating rating={rating} size={24} />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        {verified && (
          <CheckCircle2 className="h-5 w-5 fill-green-500 text-white" />
        )}
      </div>

      <p className="mb-4 leading-relaxed text-muted-foreground">{review}</p>

      <time className="mt-auto text-xs text-muted-foreground">
        Posted on {date}
      </time>
    </article>
  );
};

export default ReviewCard;
