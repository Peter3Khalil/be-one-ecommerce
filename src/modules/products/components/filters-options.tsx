import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Checkbox } from '@ui/checkbox';
import { Collapsible, CollapsibleContent } from '@ui/collapsible';
import CustomCheckbox from '@ui/custom-checkbox';
import { Input } from '@ui/input';
import { Slider } from '@ui/slider';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { FC, useReducer } from 'react';
type FilterOptionsProps = {
  title: string;
  children: React.ReactNode;
};
export const FilterOption = ({ title, children }: FilterOptionsProps) => {
  return (
    <Collapsible className="group/collapsible">
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-base leading-0 text-muted-foreground hover:text-foreground">
        <span>{title}</span>
        <ChevronRight
          size={20}
          className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

type Props = {
  options?: {
    sizes?: string[];
    priceRange?: [number, number];
    colors?: string[];
  };
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onOptionsChange?: (options: {
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
    availability: {
      inStock: boolean;
      outOfStock: boolean;
    };
  }) => void;
  defaultValues?: Partial<{
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
    availability: {
      inStock?: boolean;
      outOfStock?: boolean;
    };
  }>;
};
export const FiltersOptions: FC<Props> = ({
  options: { colors = [], priceRange, sizes = [] } = {},
  onOptionsChange,
  defaultValues,
  className,
}) => {
  const t = useTranslations();
  const { availability, ...rest } = defaultValues || {};
  const [options, dispatch] = useReducer(reducer, {
    sizes: [],
    colors: [],
    priceRange: priceRange ? [...priceRange] : [0, 100],
    availability: {
      inStock: availability?.inStock ?? false,
      outOfStock: availability?.outOfStock ?? false,
    },
    ...rest,
  });
  return (
    <div className={className}>
      <FilterOption title={t('Global.price')}>
        <Slider
          value={options.priceRange}
          defaultValue={priceRange}
          onValueChange={(value: [number, number]) => {
            dispatch({ type: 'SET_PRICE_RANGE', payload: value });
            onOptionsChange?.({ ...options, priceRange: value });
          }}
          max={priceRange ? priceRange[1] : 1000}
          min={priceRange ? priceRange[0] : 1}
          step={1}
        />
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-px">
            <label htmlFor="from" className="text-sm text-muted-foreground">
              {t('ProductsPage.from')}
            </label>
            <Input
              id="from"
              type="number"
              min={priceRange ? priceRange[0] : 1}
              value={options.priceRange[0]}
              onChange={(e) => {
                const newValue = Math.min(Number(e.target.value), 100);
                dispatch({
                  type: 'SET_PRICE_RANGE',
                  payload: [newValue, options.priceRange[1]],
                });
                onOptionsChange?.({
                  ...options,
                  priceRange: [newValue, options.priceRange[1]],
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-px">
            <label htmlFor="to" className="text-sm text-muted-foreground">
              {t('ProductsPage.to')}
            </label>
            <Input
              id="to"
              type="number"
              max={priceRange ? priceRange[1] : undefined}
              value={options.priceRange[1]}
              onChange={(e) => {
                const newValue = Math.max(Number(e.target.value), 1);
                dispatch({
                  type: 'SET_PRICE_RANGE',
                  payload: [options.priceRange[0], newValue],
                });
                onOptionsChange?.({
                  ...options,
                  priceRange: [options.priceRange[0], newValue],
                });
              }}
            />
          </div>
        </div>
      </FilterOption>
      {sizes.length > 0 && (
        <FilterOption title={t('Global.size')}>
          <ul className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <li key={size}>
                <CustomCheckbox
                  checked={options.sizes.includes(size)}
                  onChecked={(checked) => {
                    if (checked) {
                      dispatch({ type: 'ADD_SIZE', payload: size });
                      onOptionsChange?.({
                        ...options,
                        sizes: [...options.sizes, size],
                      });
                    } else {
                      dispatch({ type: 'REMOVE_SIZE', payload: size });
                      onOptionsChange?.({
                        ...options,
                        sizes: options.sizes.filter((s) => s !== size),
                      });
                    }
                  }}
                  key={size}
                >
                  {size}
                </CustomCheckbox>
              </li>
            ))}
          </ul>
        </FilterOption>
      )}

      {colors.length > 0 && (
        <FilterOption title={t('Global.color')}>
          <ul className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <li key={color}>
                <CustomCheckbox
                  checked={options.colors.includes(color)}
                  onChecked={(checked) => {
                    if (checked) {
                      dispatch({ type: 'ADD_COLOR', payload: color });
                      onOptionsChange?.({
                        ...options,
                        colors: [...options.colors, color],
                      });
                    } else {
                      dispatch({ type: 'REMOVE_COLOR', payload: color });
                      onOptionsChange?.({
                        ...options,
                        colors: options.colors.filter((c) => c !== color),
                      });
                    }
                  }}
                  key={color}
                >
                  {color}
                </CustomCheckbox>
              </li>
            ))}
          </ul>
        </FilterOption>
      )}

      <FilterOption title={t('ProductsPage.availability')}>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={options.availability.inStock}
            onCheckedChange={(checked) => {
              dispatch({
                type: 'SET_AVAILABILITY',
                payload: {
                  ...options.availability,
                  inStock: checked as boolean,
                },
              });
              onOptionsChange?.({
                ...options,
                availability: {
                  ...options.availability,
                  inStock: checked as boolean,
                },
              });
            }}
          />
          <span className="cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
            {t('ProductsPage.inStock')}
          </span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={options.availability.outOfStock}
            onCheckedChange={(checked) => {
              dispatch({
                type: 'SET_AVAILABILITY',
                payload: {
                  ...options.availability,
                  outOfStock: checked as boolean,
                },
              });
              onOptionsChange?.({
                ...options,
                availability: {
                  ...options.availability,
                  outOfStock: checked as boolean,
                },
              });
            }}
          />
          <span className="cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
            {t('ProductsPage.outOfStock')}
          </span>
        </label>
      </FilterOption>
    </div>
  );
};

type Options = {
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  availability: {
    inStock: boolean;
    outOfStock: boolean;
  };
};

type Actions =
  | {
      type: 'SET_SIZES' | 'SET_COLORS';
      payload: string[];
    }
  | {
      type: 'REMOVE_SIZE' | 'REMOVE_COLOR' | 'ADD_SIZE' | 'ADD_COLOR';
      payload: string;
    }
  | {
      type: 'SET_PRICE_RANGE';
      payload: [number, number];
    }
  | {
      type: 'SET_AVAILABILITY';
      payload: {
        inStock: boolean;
        outOfStock: boolean;
      };
    };

function reducer(state: Options, action: Actions) {
  switch (action.type) {
    case 'SET_SIZES':
      return { ...state, sizes: action.payload };
    case 'SET_COLORS':
      return { ...state, colors: action.payload };
    case 'REMOVE_SIZE':
      return {
        ...state,
        sizes: state.sizes.filter((size) => size !== action.payload),
      };
    case 'REMOVE_COLOR':
      return {
        ...state,
        colors: state.colors.filter((color) => color !== action.payload),
      };
    case 'ADD_SIZE':
      return { ...state, sizes: [...state.sizes, action.payload] };
    case 'ADD_COLOR':
      return { ...state, colors: [...state.colors, action.payload] };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_AVAILABILITY':
      return { ...state, availability: action.payload };
    default:
      return state;
  }
}
