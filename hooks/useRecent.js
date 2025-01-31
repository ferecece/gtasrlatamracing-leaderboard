import { useFetch } from "./useFetch";

const useRecent = () => {
    const baseUrl = "/toptimes/recent";
    const { data, isLoading, isError, mutate } = useFetch(baseUrl, {
        refreshInterval: 5000
    });
  
    return {
      toptimes: data,
      isLoading,
      isError,
      mutate
    };
  };
  
export default useRecent;