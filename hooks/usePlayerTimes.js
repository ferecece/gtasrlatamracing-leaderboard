import { useFetch } from "./useFetch";

const usePlayerTimes = (playerId = null) => {
    const baseUrl = playerId ? `/toptimes/player/${playerId}`: null;
    const { data, isLoading, isError, mutate } = useFetch(baseUrl);
  
    return {
      toptimes: data,
      isLoading,
      isError,
      mutate
    };
  };
  
export default usePlayerTimes;