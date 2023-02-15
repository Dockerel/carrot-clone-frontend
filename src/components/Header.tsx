import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaCarrot, FaMoon, FaSun } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import useUser from "../lib/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMeNotification, signOut } from "../api";
import { useRef } from "react";
import NotificationModal from "./NotificationModal";
import { IMeNotification } from "../types";

export default function Header() {
  const { isLoading, data } = useQuery<IMeNotification[]>(
    ["meNotification"],
    getMeNotification
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userLoading, user, isLoggedIn } = useUser();
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const {
    isOpen: isSignInOpen,
    onClose: onSignInClose,
    onOpen: onSignInOpen,
  } = useDisclosure();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(signOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Log out",
        description: "See you soon!",
        status: "loading",
        isClosable: true,
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          status: "success",
          title: "Done!",
          description: "Bye bye!",
          isClosable: true,
        });
      }
      queryClient.refetchQueries(["me"]);
      queryClient.refetchQueries(["rooms"]);
      navigate("/");
    },
  });
  const onSignOut = () => {
    mutation.mutate();
  };
  return (
    <Stack
      py={5}
      px={40}
      display="flex"
      direction={{
        sm: "column",
        md: "row",
      }}
      alignItems="center"
      justifyContent={{ md: "space-between" }}
      borderBottom={"1px solid lightgray"}
      spacing={{ sm: 10 }}
    >
      <Link to="/">
        <Box
          _hover={{ color: "orangered" }}
          color={"orange"}
          display="flex"
          alignItems={"center"}
        >
          <FaCarrot size={48} />
          <Text ml={2} fontWeight={"bold"} fontSize="3xl">
            Carrot
          </Text>
        </Box>
      </Link>
      <Box>
        <HStack>
          <IconButton
            variant={"ghost"}
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
            icon={<Icon />}
          />
          {userLoading ? null : isLoggedIn ? (
            <>
              <Menu>
                <MenuButton>
                  <Avatar
                    name={user?.username}
                    size={"md"}
                    src={user?.avatar}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/product/upload">
                    <MenuItem>Upload product</MenuItem>
                  </Link>
                  <Link to={`/user/${user?.username}`}>
                    <MenuItem>My profile</MenuItem>
                  </Link>
                  <Link to="/user-modify">
                    <MenuItem>Modify user</MenuItem>
                  </Link>
                  <MenuItem onClick={onSignOut}>Log out</MenuItem>
                </MenuList>
              </Menu>
              <Box position={"relative"}>
                <Button as={"a"} href="/chat" variant={"ghost"}>
                  <BsFillChatDotsFill />
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Button onClick={onSignInOpen}>Sign in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"orange"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          )}
        </HStack>
        <SignupModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        <SigninModal isOpen={isSignInOpen} onClose={onSignInClose} />
      </Box>
    </Stack>
  );
}
