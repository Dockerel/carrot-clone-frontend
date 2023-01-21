import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";

export default function LoginProcess() {
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in...</Heading>
      <Box pb={5}>
        <Text>Wait a second...</Text>
      </Box>
      <Spinner size={"lg"} />
    </VStack>
  );
}
