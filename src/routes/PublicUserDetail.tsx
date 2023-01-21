import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Img,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function PublicUserDetail() {
  return (
    <Center>
      <VStack align={"flex-start"} width={"50vw"} mt={10}>
        <HStack width={"100%"} height={"100px"}>
          <Img
            height={"70px"}
            width={"70px"}
            borderRadius={"full"}
            src="https://avatars.githubusercontent.com/u/74302278?v=4"
          />
          <VStack align={"flex-start"} height={"100%"}>
            <HStack align={"flex-end"} h={"50%"}>
              <Text fontSize={22} fontWeight={"extrabold"}>
                도등어
              </Text>
              <Text>서구 화정1동</Text>
            </HStack>
            <HStack align={"flex-start"} h={"50%"}>
              <Text color={"gray"} fontWeight={"bold"}>
                Rating
              </Text>
              <Text color={"gray"} fontWeight={"bold"}>
                4 / 5
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack borderBottom={"1px solid orange"} w={"100%"} pb={3}>
          <Button
            as={"a"}
            href={"/user/admin"}
            colorScheme={"orange"}
            variant={"outline"}
          >
            Sale items
          </Button>
          <Button as={"a"} href={"/user/admin/reviews"} variant={"ghost"}>
            Reviews
          </Button>
        </HStack>
        <Grid
          columnGap={3}
          rowGap={28}
          w={"100%"}
          templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
        >
          <VStack w={"100%"} h={"200px"} display={"flex"} alignItems={"center"}>
            <Square size={"100%"}>
              <Img
                borderRadius={"lg"}
                w={"100%"}
                h={"100%"}
                objectFit="cover"
                src="https://avatars.githubusercontent.com/u/74302278?v=4"
              />
            </Square>
            <Box w={"100%"}>
              <Text fontSize={20}>아이폰 팔아요</Text>
              <Text fontWeight={"extrabold"} fontSize={17}>
                10000 원
              </Text>
              <Text fontSize={15}>대구 두류3동</Text>
            </Box>
          </VStack>
          <VStack w={"100%"} h={"200px"} display={"flex"} alignItems={"center"}>
            <Square size={"100%"}>
              <Img
                borderRadius={"lg"}
                w={"100%"}
                h={"100%"}
                objectFit="cover"
                src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/B1C8877A8BCD98EC3F6731683AFD092BB88890633E69E9DDBAC9441B1612030D.jpg?q=82&s=300x300&t=crop"
              />
            </Square>
            <Box w={"100%"}>
              <Text fontSize={20}>아이폰 팔아요</Text>
              <Text fontWeight={"extrabold"} fontSize={17}>
                10000 원
              </Text>
              <Text fontSize={15}>대구 두류3동</Text>
            </Box>
          </VStack>
          <VStack w={"100%"} h={"200px"} display={"flex"} alignItems={"center"}>
            <Square size={"100%"}>
              <Img
                borderRadius={"lg"}
                w={"100%"}
                h={"100%"}
                objectFit="cover"
                src="https://avatars.githubusercontent.com/u/74302278?v=4"
              />
            </Square>
            <Box w={"100%"}>
              <Text fontSize={20}>아이폰 팔아요</Text>
              <Text fontWeight={"extrabold"} fontSize={17}>
                10000 원
              </Text>
              <Text fontSize={15}>대구 두류3동</Text>
            </Box>
          </VStack>
          <VStack w={"100%"} h={"200px"} display={"flex"} alignItems={"center"}>
            <Square size={"100%"}>
              <Img
                borderRadius={"lg"}
                w={"100%"}
                h={"100%"}
                objectFit="cover"
                src="https://avatars.githubusercontent.com/u/74302278?v=4"
              />
            </Square>
            <Box w={"100%"}>
              <Text fontSize={20}>아이폰 팔아요</Text>
              <Text fontWeight={"extrabold"} fontSize={17}>
                10000 원
              </Text>
              <Text fontSize={15}>대구 두류3동</Text>
            </Box>
          </VStack>
        </Grid>
      </VStack>
    </Center>
  );
}
