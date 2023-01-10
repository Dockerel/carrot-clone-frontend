import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment, FaNeos } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button as="a" w={"100%"} leftIcon={<FaGithub />}>
          Continue with Github
        </Button>
        <Button
          as={"a"}
          w={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
        <Button as={"a"} w={"100%"} leftIcon={<FaNeos />} colorScheme={"green"}>
          Continue with Naver
        </Button>
      </VStack>
    </Box>
  );
}
