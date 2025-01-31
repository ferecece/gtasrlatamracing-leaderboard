import { useFetch } from "./useFetch";

const usePlayer = (playerId = null) => {
    const baseUrl = playerId ? `/players/${playerId}`: null;
    const { data, isLoading, isError, mutate } = useFetch(baseUrl);
  
    return {
      player: typeof data === "array" ? null : data,
      isLoading,
      isError,
      mutate
    };
  };
  
export default usePlayer;