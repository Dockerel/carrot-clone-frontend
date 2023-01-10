import { Button, Heading, Text, useColorMode, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack bg="gray.100" minH={"100vh"} justifyContent="center">
      <Heading textShadow={colorMode === "light" ? "" : "1px 1px #000000"}>
        Page not found.
      </Heading>
      <Text textShadow={colorMode === "light" ? "" : "1px 1px #000000"}>
        The Webpage cannot be found.
      </Text>
      <Link to="/">
        <Button
          fontWeight={"bold"}
          fontSize={20}
          mt={3}
          colorScheme={"orange"}
          variant="link"
          textShadow={colorMode === "light" ? "" : "1px 1px #000000"}
        >
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
