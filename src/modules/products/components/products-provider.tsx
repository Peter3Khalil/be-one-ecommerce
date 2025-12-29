'use client';
import useDebounce from '@/hooks/use-debounce';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { parseAsString, useQueryStates } from 'nuqs';
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
      type: 'RESET_FILTERS';
    };

function reducer(state: ProductParams, action: Actions): ProductParams {
  switch (action.type) {
    case 'SET_PRODUCT_NAME':
      return { ...state, product_name: action.payload, offset: '1' };
    case 'SET_PAGE':
      return { ...state, offset: action.payload };
    case 'RESET_FILTERS':
      return { product_name: '', offset: '1' };
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
