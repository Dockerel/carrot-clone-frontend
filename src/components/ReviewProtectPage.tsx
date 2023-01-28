import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../api";
import useUser from "../lib/useUser";
import { IProductDetail } from "../types";

interface IProtectPage {
  children: React.ReactNode;
}
export default function ReviewProtectPage({ children }: IProtectPage) {
  const { productPk } = useParams();
  const { userLoading, user } = useUser();
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery<IProductDetail>(
    ["product", productPk],
    getProduct
  );
  useEffect(() => {
    if (!isLoading && !userLoading) {
      if (data?.buyer?.username !== user?.username) {
        toast({
          title: "Not authenticated",
          status: "error",
        });
        navigate("/");
      }
    }
  }, [isLoading, userLoading, user, data]);
  return <>{children}</>;
}
