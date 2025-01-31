import { useFetch } from "./useFetch";

const useServer = () => {
    const baseUrl = "/server";
    const { data, isLoading, isError, mutate } = useFetch(baseUrl, { refreshInterval: 5000 });
  
    return {
      server: data,
      isLoading,
      isError,
      mutate
    };
  };
  
export default useServer;