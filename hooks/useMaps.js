import { useFetch } from "./useFetch";

const useMaps = (search = "") => {
  const endpoint = search.trim() ? `/maps?search=${encodeURIComponent(search)}` : null;
    const { data, isLoading, isError, mutate } = useFetch(endpoint);
  
    return {
      maps: data || [],
      isLoading,
      isError,
      mutate
    };
  };
  
export default useMaps;