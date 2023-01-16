import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCarrot, FaMoon, FaSun } from "react-icons/fa";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";

export default function Header() {
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
      <HStack>
        <IconButton
          variant={"ghost"}
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        <Button onClick={onSignInOpen}>Sign in</Button>
        <LightMode>
          <Button onClick={onSignUpOpen} colorScheme={"orange"}>
            Sign up
          </Button>
        </LightMode>
      </HStack>
      <SignupModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      <SigninModal isOpen={isSignInOpen} onClose={onSignInClose} />
    </Stack>
  );
}
