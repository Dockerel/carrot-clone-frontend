import { Box, Skeleton } from "@chakra-ui/react";

export default function ProductDetailSkeleton() {
  return (
    <Box>
      <Skeleton w={"600px"} h={"600px"} borderRadius={"2xl"} />
    </Box>
  );
}
