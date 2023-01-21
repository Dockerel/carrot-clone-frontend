import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";
import { IProductList } from "../types";
import noImage from "../image/noImage.jpg";

export default function Home() {
  const { isLoading, data } = useQuery<IProductList[]>(
    ["products"],
    getProducts
  );
  return (
    <Grid
      py={"10"}
      px={{ sm: "20", md: "40" }}
      gap="10"
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(5 ,1fr)",
      }}
    >
      {isLoading ? (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      ) : null}
      {data?.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          photoUrl={
            product.photos[0] === undefined ? noImage : product.photos[0].file
          }
          name={product.name}
          price={product.price}
          address={product.owner.address}
        />
      ))}
    </Grid>
  );
}
