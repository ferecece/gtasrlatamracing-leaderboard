import { useFetch } from "./useFetch";

const usePlayers = () => {
    const baseUrl = "/players";
    const { data, isLoading, isError, mutate } = useFetch(baseUrl);
  
    return {
      players: data,
      isLoading,
      isError,
      mutate
    };
  };
  
export default usePlayers;