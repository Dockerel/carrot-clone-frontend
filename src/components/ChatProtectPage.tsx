import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectPage {
  children: React.ReactNode;
}
export default function ChatProtectPage({ children }: IProtectPage) {
  const { userLoading, user, isLoggedIn } = useUser();
  const { username } = useParams();

  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn || username === user?.username) {
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
