import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const QueryProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
