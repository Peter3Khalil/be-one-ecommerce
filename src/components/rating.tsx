import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react';

const Rating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            size={size}
            key={i}
            className={cn(
              i < Math.floor(rating)
                ? 'fill-primary text-accent'
                : 'fill-accent text-muted'
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{rating}/5</span>
    </div>
  );
};

export default Rating;
