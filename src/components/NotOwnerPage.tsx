import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, getMe } from "../api";
import { IProductDetail, IUserMe } from "../types";

interface INotOwnerPage {
  children: React.ReactNode;
}

export default function NotOwnerPage({ children }: INotOwnerPage) {
  const { productPk } = useParams();
  const { isLoading: productIsLoading, data: productData } =
    useQuery<IProductDetail>(["products", productPk], getProduct, {
      retry: false,
    });
  const { isLoading: meIsLoading, data: meData } = useQuery<IUserMe>(
    ["me"],
    getMe,
    {
      retry: false,
    }
  );
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (!productIsLoading && !meIsLoading) {
      if (productData?.owner.username !== meData?.username) {
        toast({
          title: "Not authenticated",
          status: "error",
          isClosable: true,
        });
        navigate("/");
      }
    }
  }, [productIsLoading, meIsLoading, productData, meData]);

  return <>{children}</>;
}
