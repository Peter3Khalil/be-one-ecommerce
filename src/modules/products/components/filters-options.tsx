import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Checkbox } from '@ui/checkbox';
import { Collapsible, CollapsibleContent } from '@ui/collapsible';
import CustomCheckbox from '@ui/custom-checkbox';
import { Input } from '@ui/input';
import { Slider } from '@ui/slider';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { FC, useReducer } from 'react';
import { AvailableFilters } from '../types';
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
type Options = AvailableFilters & {
  availability: {
    inStock: boolean;
    outOfStock: boolean;
  };
};
type Props = {
  options: Options;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onOptionsChange?: (options: Options) => void;
  defaultValues?: Partial<Options>;
};

const INITIAL_OPTIONS: Options = {
  colors: [],
  sizes: [],
  categories: [],
  price_range: {
    min_price: '0',
    max_price: '1000',
  },
  availability: {
    inStock: false,
    outOfStock: false,
  },
};
export const FiltersOptions: FC<Props> = ({
  options: { colors = [], sizes = [], categories = [], price_range } = {},
  onOptionsChange,
  defaultValues = INITIAL_OPTIONS,
  className,
}) => {
  const t = useTranslations();
  const [values, dispatch] = useReducer(reducer, {
    ...INITIAL_OPTIONS,
    ...defaultValues,
  });
  return (
    <div className={className}>
      <FilterOption title={t('Global.price')}>
        <Slider
          value={parsePriceRange(values.price_range)}
          defaultValue={parsePriceRange(values.price_range)}
          onValueChange={(value: [number, number]) => {
            dispatch({ type: 'SET_PRICE_RANGE', payload: value });
            onOptionsChange?.({
              ...values,
              price_range: {
                min_price: value[0].toString(),
                max_price: value[1].toString(),
              },
            });
          }}
          max={Number(price_range?.max_price) || 1000}
          min={Number(price_range?.min_price) || 1}
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
              min={Number(price_range?.min_price) || 1}
              value={parsePriceRange(values.price_range)[0]}
              onChange={(e) => {
                const newValue = Math.min(Number(e.target.value), 100);
                dispatch({
                  type: 'SET_PRICE_RANGE',
                  payload: [newValue, parsePriceRange(values.price_range)[1]],
                });
                onOptionsChange?.({
                  ...values,
                  price_range: {
                    min_price: newValue.toString(),
                    max_price: values.price_range.max_price,
                  },
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
              max={Number(price_range?.max_price) || 1000}
              value={parsePriceRange(values.price_range)[1]}
              onChange={(e) => {
                const newValue = Math.max(Number(e.target.value), 1);
                dispatch({
                  type: 'SET_PRICE_RANGE',
                  payload: [parsePriceRange(values.price_range)[0], newValue],
                });
                onOptionsChange?.({
                  ...values,
                  price_range: {
                    min_price: values.price_range.min_price,
                    max_price: newValue.toString(),
                  },
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
                  checked={values.sizes.includes(size)}
                  onChecked={(checked) => {
                    if (checked) {
                      dispatch({ type: 'ADD_SIZE', payload: size });
                      onOptionsChange?.({
                        ...values,
                        sizes: [...values.sizes, size],
                      });
                    } else {
                      dispatch({ type: 'REMOVE_SIZE', payload: size });
                      onOptionsChange?.({
                        ...values,
                        sizes: values.sizes.filter((s) => s !== size),
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
                  checked={values.colors.includes(color)}
                  onChecked={(checked) => {
                    if (checked) {
                      dispatch({ type: 'ADD_COLOR', payload: color });
                      onOptionsChange?.({
                        ...values,
                        colors: [...values.colors, color],
                      });
                    } else {
                      dispatch({ type: 'REMOVE_COLOR', payload: color });
                      onOptionsChange?.({
                        ...values,
                        colors: values.colors.filter((c) => c !== color),
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

      {categories.length > 0 && (
        <FilterOption title={t('Global.category')}>
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category}>
                <CustomCheckbox
                  checked={values.categories.includes(category)}
                  onChecked={(checked) => {
                    if (checked) {
                      dispatch({ type: 'ADD_CATEGORY', payload: category });
                      onOptionsChange?.({
                        ...values,
                        categories: [...values.categories, category],
                      });
                    } else {
                      dispatch({ type: 'REMOVE_CATEGORY', payload: category });
                      onOptionsChange?.({
                        ...values,
                        categories: values.categories.filter(
                          (c) => c !== category
                        ),
                      });
                    }
                  }}
                  key={category}
                >
                  {category}
                </CustomCheckbox>
              </li>
            ))}
          </ul>
        </FilterOption>
      )}

      <FilterOption title={t('ProductsPage.availability')}>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={values.availability.inStock}
            onCheckedChange={(checked) => {
              dispatch({
                type: 'SET_AVAILABILITY',
                payload: {
                  ...values.availability,
                  inStock: checked as boolean,
                },
              });
              onOptionsChange?.({
                ...values,
                availability: {
                  ...values.availability,
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
            checked={values.availability.outOfStock}
            onCheckedChange={(checked) => {
              dispatch({
                type: 'SET_AVAILABILITY',
                payload: {
                  ...values.availability,
                  outOfStock: checked as boolean,
                },
              });
              onOptionsChange?.({
                ...values,
                availability: {
                  ...values.availability,
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

type Actions =
  | {
      type: 'SET_SIZES' | 'SET_COLORS' | 'SET_CATEGORIES';
      payload: string[];
    }
  | {
      type:
        | 'REMOVE_SIZE'
        | 'REMOVE_COLOR'
        | 'REMOVE_CATEGORY'
        | 'ADD_SIZE'
        | 'ADD_COLOR'
        | 'ADD_CATEGORY'
        | 'REMOVE_CATEGORY';
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
    }
  | {
      type: 'RESET_FILTERS';
    };

function reducer(state: Options, action: Actions): Options {
  switch (action.type) {
    case 'SET_SIZES':
      return { ...state, sizes: action.payload };
    case 'SET_COLORS':
      return { ...state, colors: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_SIZE':
      return { ...state, sizes: [...state.sizes, action.payload] };
    case 'REMOVE_SIZE':
      return {
        ...state,
        sizes: state.sizes.filter((size) => size !== action.payload),
      };
    case 'ADD_COLOR':
      return { ...state, colors: [...state.colors, action.payload] };
    case 'REMOVE_COLOR':
      return {
        ...state,
        colors: state.colors.filter((color) => color !== action.payload),
      };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category !== action.payload
        ),
      };
    case 'SET_PRICE_RANGE':
      return {
        ...state,
        price_range: {
          max_price: action.payload[1].toString(),
          min_price: action.payload[0].toString(),
        },
      };
    case 'SET_AVAILABILITY':
      return { ...state, availability: action.payload };
    case 'RESET_FILTERS':
      return {
        sizes: [],
        colors: [],
        categories: [],
        price_range: {
          min_price: '0',
          max_price: '1000',
        },
        availability: {
          inStock: false,
          outOfStock: false,
        },
      };
    default:
      return state;
  }
}

function parsePriceRange(priceRange: Options['price_range']): [number, number] {
  return [Number(priceRange.min_price), Number(priceRange.max_price)];
}
