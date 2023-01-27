import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Img,
  Square,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  getPublicUserDetail,
  getUserOnSaleProducts,
  postProductIsSold,
} from "../api";
import publicUser from "../image/publicUser.jpg";
import noImage from "../image/noImage.jpg";
import { IPublicUserDetail, IUserOnSaleProduct } from "../types";
import useUser from "../lib/useUser";
import { FaCamera, FaPencilAlt } from "react-icons/fa";

export default function PublicUserDetail() {
  const { username } = useParams();
  const { user } = useUser();
  const { isLoading: userDataIsLoading, data: userData } =
    useQuery<IPublicUserDetail>(["userDetail", username], getPublicUserDetail);
  const { isLoading: productsDataIsLoading, data: productsData } = useQuery<
    IUserOnSaleProduct[]
  >(["userOnSaleProducts", username], getUserOnSaleProducts);
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation(postProductIsSold, {
    onSuccess: () => {
      toast({
        title: "Product status changed to 'Sold'!",
        status: "success",
      });
      queryClient.refetchQueries(["userOnSaleProducts"]);
    },
  });
  const onSoldClick = (id: number) => {
    mutation.mutate(id);
  };

  return (
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
          <Button
            as={"a"}
            href={"/user/admin"}
            colorScheme={"orange"}
            variant={"outline"}
          >
            Sale items
          </Button>
          <Button as={"a"} href={"/user/admin/reviews"} variant={"ghost"}>
            Reviews
          </Button>
        </HStack>
        <Grid
          columnGap={3}
          rowGap={28}
          w={"100%"}
          templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
        >
          {!productsDataIsLoading && productsData ? (
            <>
              {productsData?.map((product, index) => (
                <Box position={"relative"} key={index}>
                  {userData?.username !== user?.username ? null : (
                    <HStack w={"100%"} mb={3}>
                      <Button as={"a"} href={"https://www.naver.com"} w={"50%"}>
                        <FaPencilAlt />
                      </Button>
                      <Button
                        as={"a"}
                        href={`/products/${product.pk}/photo-upload`}
                        w={"50%"}
                      >
                        <FaCamera />
                      </Button>
                    </HStack>
                  )}
                  <Link to={`/products/${product.pk}`}>
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
                            product.photos.length > 0
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

                  {userData?.username !== user?.username ? null : (
                    <Button
                      mt={"10px"}
                      colorScheme={"orange"}
                      w={"60px"}
                      h={"30px"}
                      fontSize={"15px"}
                      disabled={product.is_sold}
                      onClick={() => onSoldClick(product.pk)}
                      position={"absolute"}
                      top={"50px"}
                      left={"10px"}
                    >
                      Sold
                    </Button>
                  )}
                </Box>
              ))}
            </>
          ) : (
            <Center mt={"10%"}>
              <Text fontSize={"30px"} fontWeight={"extrabold"}>
                No Product...
              </Text>
            </Center>
          )}
        </Grid>
      </VStack>
    </Center>
  );
}
