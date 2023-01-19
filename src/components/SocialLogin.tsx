import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
  const githubParams = {
    client_id: "d877e128569aba7998cb",
    scope: "read:user,user:email",
  };
  const paramsG = new URLSearchParams(githubParams).toString();

  const kakaoParams = {
    client_id: "792bcd646d46d44b3f56dd4039e63fc7",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const paramK = new URLSearchParams(kakaoParams).toString();

  const generateRandomString = (num: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz9876543210";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const state = generateRandomString(Math.floor(Math.random() * 10 + 10));
  const naverLoginClick = () => {
    sessionStorage.setItem("nState", state);
  };

  const naverParams = {
    response_type: "code",
    client_id: "pJIeDRqJex8LshmCWf0R",
    redirect_uri: "http://127.0.0.1:3000/social/naver",
    state: state,
  };
  const paramN = new URLSearchParams(naverParams).toString();

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
        <Button
          as="a"
          href={`https://github.com/login/oauth/authorize?${paramsG}`}
          w={"100%"}
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${paramK}`}
          w={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
        <Button
          as={"a"}
          href={`https://nid.naver.com/oauth2.0/authorize?${paramN}`}
          w={"100%"}
          leftIcon={<Text fontWeight={"extrabold"}>N</Text>}
          colorScheme={"green"}
          onClick={naverLoginClick}
        >
          Continue with Naver
        </Button>
      </VStack>
    </Box>
  );
}
