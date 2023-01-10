import { Grid } from "@chakra-ui/react";
import Product from "../components/Product";

export default function Home() {
  return (
    <Grid
      py={"10"}
      px={{ sm: "20", md: "30", lg: "40" }}
      columnGap={10}
      rowGap={20}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4,1fr)",
      }}
    >
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </Grid>
  );
}
