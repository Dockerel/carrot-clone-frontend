import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getMe, userModify } from "../api";
import { IModifyUserMe } from "../types";

interface IForm {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone_nb: string;
  address: string;
  detailed_address: string;
}

export default function UserModify() {
  const { register, handleSubmit } = useForm<IModifyUserMe>();
  const queryClient = useQueryClient();
  const { data: meInfo, isLoading: isMeLoading } = useQuery<IForm>(
    ["user"],
    getMe
  );
  const [address, setAddress] = useState("Main address");
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(userModify, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "User info successfully modified",
      });
      navigate("/");
      queryClient.refetchQueries(["user"]);
    },
  });
  const [openPostcode, setOpenPostcode] = useState(false);
  const handleAddress = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  const onSubmit = (data: IModifyUserMe) => {
    const targetData = Object.assign(data, { address: address });
    mutation.mutate(targetData);
  };

  return (
    <Container my={100}>
      <Heading mb={"50px"} textAlign={"center"}>
        Modify user information
      </Heading>
      {isMeLoading ? (
        <VStack mt={100} justifyContent={"center"}>
          <Spinner size={"lg"} />
        </VStack>
      ) : (
        <VStack spacing={10} as="form" mt={5} onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              {...register("first_name")}
              defaultValue={meInfo?.first_name}
              required
              type="text"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              {...register("last_name")}
              defaultValue={meInfo?.last_name}
              required
              type="text"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email")}
              defaultValue={meInfo?.email}
              required
              type="email"
            ></Input>
          </FormControl>

          <FormControl>
            <FormLabel>Phone number</FormLabel>
            <Input
              {...register("phone_nb")}
              defaultValue={meInfo?.phone_nb}
              required
              type="text"
            ></Input>
            <FormHelperText>Write the number of your phone</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              required
              type="text"
              value={address}
              readOnly
              onClick={handleAddress.clickButton}
            ></Input>
            {openPostcode && (
              <DaumPostcode
                onComplete={handleAddress.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              />
            )}
            <FormHelperText>Click to search address</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Detailed address</FormLabel>
            <Input
              {...register("detailed_address")}
              defaultValue={meInfo?.detailed_address}
              required
              type="text"
            ></Input>
          </FormControl>

          <Button type="submit" colorScheme={"orange"} size="lg" w="100%">
            Finish user modify
          </Button>
        </VStack>
      )}
    </Container>
  );
}
