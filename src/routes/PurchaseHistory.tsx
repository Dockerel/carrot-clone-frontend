import {
  Avatar,
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Img,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getPublicUserDetail, getPurchaseHistory } from "../api";
import ProtectPage from "../components/ProtectPage";
import { IProductList, IPublicUserDetail } from "../types";
import publicUser from "../image/publicUser.jpg";
import noImage from "../image/noImage.jpg";

export default function PurchaseHistory() {
  const { username } = useParams();
  const { isLoading: userDataIsLoading, data: userData } =
    useQuery<IPublicUserDetail>(["userDetail", username], getPublicUserDetail);
  const { isLoading: productDataIsLoading, data: productData } = useQuery<
    IProductList[]
  >(["purchaseHistory", username], getPurchaseHistory);
  return (
    <ProtectPage>
      <Center>
        <VStack align={"flex-start"} width={"50vw"} mt={10}>
          <HStack width={"100%"} height={"100px"}>
            <Img
              height={"70px"}
              width={"70px"}
              borderRadius={"full"}
              src={userData?.avatar ? userData?.avatar : publicUser}
            />
            <VStack align={"flex-start"} height={"100%"}>
              <HStack align={"flex-end"} h={"50%"}>
                <Text fontSize={22} fontWeight={"extrabold"}>
                  {userData?.username}
                </Text>
                <Text>{userData?.address}</Text>
              </HStack>
              <HStack align={"flex-start"} h={"50%"}>
                <Text color={"gray"} fontWeight={"bold"}>
                  Rating
                </Text>
                <Text color={"gray"} fontWeight={"bold"}>
                  {userData?.rating} / 5
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <HStack borderBottom={"1px solid orange"} w={"100%"} pb={3}>
            <Button as={"a"} href={"/user/admin"} variant={"outline"}>
              Sale items
            </Button>
            <Button as={"a"} href={"/user/admin/reviews"} variant={"outline"}>
              Reviews
            </Button>
            <Button
              as={"a"}
              href={`/user/${username}/purchase-history`}
              colorScheme={"orange"}
              variant={"solid"}
            >
              Purchase history
            </Button>
          </HStack>
          <Grid
            columnGap={3}
            rowGap={28}
            w={"100%"}
            templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
          >
            {productDataIsLoading ? null : (
              <>
                {productData?.map((product, index) => (
                  <Link to={`/products/${product.id}`} key={index}>
                    <VStack
                      w={"100%"}
                      h={"200px"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Square size={"100%"}>
                        <Img
                          borderRadius={"lg"}
                          w={"100%"}
                          h={"100%"}
                          objectFit="cover"
                          src={
                            product.photos.length !== 0
                              ? product.photos[0].file
                              : noImage
                          }
                        />
                      </Square>
                      <Box w={"100%"}>
                        <Text fontSize={20}>{product.name}</Text>
                        <Text fontWeight={"extrabold"} fontSize={17}>
                          {product.price} 원
                        </Text>
                        <Text fontSize={15}>{userData?.address}</Text>
                      </Box>
                    </VStack>
                  </Link>
                ))}
              </>
            )}
          </Grid>
        </VStack>
      </Center>
    </ProtectPage>
  );
}
