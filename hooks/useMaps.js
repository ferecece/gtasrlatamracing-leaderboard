import { useFetch } from "./useFetch";

const useMaps = () => {
    const baseUrl = "/maps";
    const { data, isLoading, isError, mutate } = useFetch(baseUrl);
  
    return {
      maps: data,
      isLoading,
      isError,
      mutate
    };
  };
  
export default useMaps;