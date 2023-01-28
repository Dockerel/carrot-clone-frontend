import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectPage {
  children: React.ReactNode;
}

export default function ProtectPage({ children }: IProtectPage) {
  const { username } = useParams();
  const { userLoading, user } = useUser();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (user === undefined || user.username !== username) {
        toast({
          title: "Not authenticated",
          status: "error",
        });
        navigate("/");
      }
    }
  }, [userLoading, user]);
  return <>{children}</>;
}
