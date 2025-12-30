'use client';
import { QueryClient, QueryClientProvider as QCP } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
    },
  },
});
const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <QCP client={queryClient}>{children}</QCP>;
};
export default QueryClientProvider;
