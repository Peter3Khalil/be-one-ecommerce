'use client';
import useDebounce from '@/hooks/use-debounce';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useProductsQuery } from '../queries';
import { ProductParams, ProductsResponse } from '../types';

type ContextType = {
  queryResult: UseQueryResult<AxiosResponse<ProductsResponse>>;
  dispatch: Dispatch<Actions>;
  params: ProductParams;
};
type Actions =
  | { type: 'SET_PRODUCT_NAME'; payload?: string }
  | {
      type: 'SET_PAGE';
      payload: string;
    }
  | {
      type: 'SET_CATEGORIES' | 'SET_COLORS' | 'SET_SIZES';
      payload: string[];
    }
  | {
      type: 'SET_PRICE_RANGE';
      payload: { min_price: string; max_price: string };
    }
  | {
      type: 'RESET_FILTERS';
    };

function reducer(state: ProductParams, action: Actions): ProductParams {
  switch (action.type) {
    case 'SET_PRODUCT_NAME':
      return { ...state, product_name: action.payload, offset: '0' };
    case 'SET_PAGE':
      return { ...state, offset: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, category_name: action.payload, offset: '0' };
    case 'SET_COLORS':
      return { ...state, color: action.payload, offset: '0' };
    case 'SET_SIZES':
      return { ...state, size: action.payload, offset: '0' };
    case 'RESET_FILTERS':
      return {
        product_name: '',
        offset: '0',
        category_name: [],
        color: [],
        size: [],
        price: '',
        min_price: '',
        max_price: '',
      };
    default:
      return state;
  }
}

const ProductsContext = createContext<ContextType | undefined>(undefined);
const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useQueryStates(
    {
      product_name: parseAsString.withDefault(''),
      offset: parseAsString.withDefault('0'),
      category_name: parseAsArrayOf(parseAsString).withDefault([]),
      color: parseAsArrayOf(parseAsString).withDefault([]),
      size: parseAsArrayOf(parseAsString).withDefault([]),
      price: parseAsString.withDefault(''),
      max_price: parseAsString.withDefault(''),
      min_price: parseAsString.withDefault(''),
    },
    { history: 'replace' }
  );
  const debouncedSearch = useDebounce(params);

  const queryResult = useProductsQuery(debouncedSearch);
  const [state, dispatch] = useReducer(reducer, params);

  useEffect(() => {
    setParams(state);
  }, [state, setParams]);

  return (
    <ProductsContext.Provider
      value={{
        queryResult,
        dispatch,
        params: state,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

const withProductsProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    return (
      <ProductsProvider>
        <Component {...props} />
      </ProductsProvider>
    );
  };

  WrappedComponent.displayName = 'withProductsProvider';

  return WrappedComponent;
};

export { useProducts, withProductsProvider, ProductsProvider };
