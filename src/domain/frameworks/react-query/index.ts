import { AxiosError } from "axios";
import { handleGlobalError } from "domain/services/notification";
import { QueryClient } from "react-query";

const handleGlobalErrorNotification = (error: unknown): void => {
  const globalError = error as AxiosError;
  return handleGlobalError(globalError);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: handleGlobalErrorNotification,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      onError: handleGlobalErrorNotification,
      retry: 0,
    },
  },
});

export { queryClient };
