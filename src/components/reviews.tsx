import { Button } from '@ui/button';
import ReviewCard from './review-card';
import { reviews } from '@public/data.json';
import { ChevronDown } from 'lucide-react';
const Reviews = () => {
  return (
    <section className="container py-10 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">
          Customer Reviews
          <span className="ml-2 text-muted-foreground">({reviews.length})</span>
        </h2>
        <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
          <Button className="rounded-full" variant="secondary" size="lg">
            Latest <ChevronDown />
          </Button>
          <Button className="rounded-full" size="lg">
            Write a Review
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
