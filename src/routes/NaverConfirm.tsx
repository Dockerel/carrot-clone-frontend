import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogin } from "../api";
import LoginProcess from "../components/LoginProcess";
export default function NaverConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(naverLogin, {
    onSuccess: () => {
      toast({
        title: "Welcome!",
        status: "success",
      });
      sessionStorage.removeItem("nState");
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });

  const confirmNaver = () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    const state = params.get("state");
    const sessionState = sessionStorage.getItem("nState");
    if (code && state && state === sessionState) {
      mutation.mutate({ code, state });
    }
  };
  useEffect(() => {
    confirmNaver();
  }, []);
  return <LoginProcess />;
}
