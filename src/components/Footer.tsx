import { Box, Stack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Stack
      py={5}
      display="flex"
      direction={{
        sm: "column",
        md: "row",
      }}
      justifyContent="center"
      alignItems="center"
      borderTop={"1px solid gray"}
    >
      <Box w={"60vw"}>
        <Box mb={1} display={"flex"} columnGap={1}>
          <Text fontWeight={"bold"} fontSize={20}>
            All rights reserved to
          </Text>
          <Text fontWeight={"bold"} fontSize={20} color={"orange.500"}>
            당근마켓
          </Text>
        </Box>
        <Text fontSize={17} fontWeight="extrabold">
          당근마켓 Clone | {new Date().getFullYear()}
        </Text>
      </Box>
    </Stack>
  );
}
