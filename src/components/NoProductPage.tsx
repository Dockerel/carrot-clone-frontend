import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../api";
import { IProductDetail } from "../types";

interface INoProductPage {
  children: React.ReactNode;
}

export default function NoProductPage({ children }: INoProductPage) {
  const { productPk } = useParams();
  const { isLoading, data } = useQuery<IProductDetail>(
    ["products", productPk],
    getProduct,
    { retry: false }
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/");
    }
  }, [data, isLoading]);
  return <>{children}</>;
}
