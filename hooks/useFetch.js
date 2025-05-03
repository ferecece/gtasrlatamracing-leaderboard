import useSWR from "swr";
import { getData } from "@lib/api";
export const useFetch = (endpoint, options = {}) => {
  const { data, error, isLoading, mutate } = useSWR(endpoint, getData, options);
  console.log(error);
  return {
    data: data || [],
    isLoading,
    isError: error ? error.message : null,
    mutate,
  };
};
