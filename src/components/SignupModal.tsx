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
import { queryByLabelText } from "@testing-library/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaCheck,
  FaEnvelope,
  FaKey,
  FaPhone,
  FaUserSecret,
} from "react-icons/fa";
import { signUp } from "../api";
import SocialLogin from "./SocialLogin";

interface ISignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  email: string;
  password: string;
  password_check: string;
}

export default function SignupModal({ isOpen, onClose }: ISignUpModalProps) {
  const { register, reset, handleSubmit } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(signUp, {
    onMutate: () => {
      toastId.current = toast({
        title: "Sign in...",
        description: "Hello!",
        status: "loading",
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Welcome to being here!",
          description: "Please sign in!",
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
          title: "Account with this username / email already exists.",
          status: "error",
          isClosable: true,
        });
      }
    },
  });
  const onSubmit = ({ username, email, password, password_check }: IForm) => {
    if (password === password_check) {
      mutation.mutate({
        username,
        email,
        password,
        password_check,
      });
    } else {
      toast({
        title: "Please check password",
        status: "error",
      });
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
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
                    <FaEnvelope />
                  </Box>
                }
              ></InputLeftElement>
              <Input
                {...register("email", { required: true })}
                type={"email"}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaKey />
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
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaCheck />
                  </Box>
                }
              />
              <Input
                {...register("password_check", { required: true })}
                type={"password"}
                variant={"filled"}
                placeholder="Password Check"
              />
            </InputGroup>
          </VStack>
          <Button type="submit" mt={5} colorScheme={"orange"} w="100%">
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
