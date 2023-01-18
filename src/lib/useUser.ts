import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUserMe } from "../types";

export default function useUser() {
  const { isLoading, data, isError } = useQuery<IUserMe>(["me"], getMe, {
    retry: false,
  });
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
