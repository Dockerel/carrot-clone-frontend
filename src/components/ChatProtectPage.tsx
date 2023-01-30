import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectPage {
  children: React.ReactNode;
}
export default function ChatProtectPage({ children }: IProtectPage) {
  const { user1, user2 } = useParams();
  const { userLoading, user, isLoggedIn } = useUser();
  console.log(isLoggedIn);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (
        (user?.username !== user1 && user?.username !== user2) ||
        user1 === user2 ||
        !isLoggedIn
      ) {
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
