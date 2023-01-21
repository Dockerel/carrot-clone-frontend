import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogin } from "../api";
import LoginProcess from "../components/LoginProcess";

export default function GithubConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(githubLogin, {
    onSuccess: () => {
      toast({
        title: "Welcome!",
        status: "success",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });
  const confirmLogin = () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return <LoginProcess />;
}
