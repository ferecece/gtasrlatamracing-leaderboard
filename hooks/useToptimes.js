import { useFetch } from "./useFetch";

const useToptimes = (resName = null) => {
  const baseUrl = resName ? `/toptimes?mapResName=${resName}` : null;
  const { data, isLoading, isError, mutate } = useFetch(baseUrl);

  return {
    toptimes: data,
    isLoading,
    isError,
    mutate,
  };
};

export default useToptimes;
