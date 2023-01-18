import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ToastId,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signIn } from "../api";
import SocialLogin from "./SocialLogin";

interface ISignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function SigninModal({ isOpen, onClose }: ISignInModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<IForm>();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(signIn, {
    onMutate: () => {
      toastId.current = toast({
        title: "Login...",
        description: "Hello!",
        status: "loading",
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Welcome!",
          status: "success",
          isClosable: true,
        });
        onClose();
        reset();
        queryClient.refetchQueries(["me"]);
      }
    },
    onError: (err) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Check your username / password.",
          status: "error",
          isClosable: true,
        });
      }
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                {...register("username", { required: true })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                {...register("password", { required: true })}
                type={"password"}
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <Button type="submit" mt={5} colorScheme={"orange"} w="100%">
            Sign in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
