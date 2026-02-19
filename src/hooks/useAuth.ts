import { getUser } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  return { data, isLoading, isError, error };
};
