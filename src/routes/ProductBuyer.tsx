import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPublicUserDetail, putProductBuyer } from "../api";
import NotOwnerPage from "../components/NotOwnerPage";
import { IPublicUserDetail } from "../types";

interface IForm {
  username: string;
}

export default function ProductBuyer() {
  const { productPk } = useParams();
  const { register, watch, handleSubmit } = useForm<IForm>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(putProductBuyer, {
    onSuccess: () => {
      toast({
        title: "Buyer added!",
        status: "success",
      });
      navigate("/");
    },
  });

  let username = watch("username");
  const { isLoading, data } = useQuery<IPublicUserDetail>(
    ["userDetail", username],
    getPublicUserDetail,
    {
      retry: false,
    }
  );

  const onBuyerSubmit = () => {
    if (productPk) {
      if (data !== undefined) {
        mutation.mutate({
          productPk,
          username: data?.username,
        });
      }
    }
  };

  const onSearchButtonClick = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    queryClient.refetchQueries(["userDetail", watch("username")]);
  };
  return (
    <NotOwnerPage>
      <Container my={100}>
        <Heading mb={"50px"} textAlign={"center"}>
          Set buyer
        </Heading>
        <VStack
          spacing={10}
          as="form"
          mt={5}
          onSubmit={handleSubmit(onBuyerSubmit)}
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Box display={"flex"}>
              <Input
                {...register("username")}
                placeholder="Search user by username"
                required
                type="text"
              ></Input>
              <Button ml={"10px"} onClick={onSearchButtonClick}>
                <FaSearch />
              </Button>
            </Box>
          </FormControl>
          {data === undefined ? null : (
            <Link to={`/user/${data?.username}`}>
              <HStack
                borderRadius={"2xl"}
                w={"100%"}
                border={"1px solid gray"}
                py={"15px"}
                px={"20px"}
              >
                <Avatar
                  name={data?.username}
                  h={"70px"}
                  w={"70px"}
                  src={data?.avatar}
                  borderRadius={"full"}
                  mr={"20px"}
                />
                <VStack align={"flex-start"}>
                  <Text fontSize={"25px"} fontWeight={"extrabold"}>
                    {data?.username}
                  </Text>
                  <Text mt={0} fontSize={"15px"}>
                    {data?.address}
                  </Text>
                  <Text fontWeight={"bold"} fontSize={"15px"}>
                    {data?.rating} / 5
                  </Text>
                </VStack>
              </HStack>
            </Link>
          )}
          <Button type="submit" colorScheme={"orange"} size="lg" w="100%">
            Set buyer
          </Button>
        </VStack>
      </Container>
    </NotOwnerPage>
  );
}
