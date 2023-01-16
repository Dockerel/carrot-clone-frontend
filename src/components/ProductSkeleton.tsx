import { Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

export default function ProductSkeleton() {
  return (
    <VStack
      w={"100%"}
      display={"flex"}
      alignItems={{ sm: "center", md: "flex-start" }}
    >
      <Skeleton mb={3} borderRadius={"lg"} w={"25vh"} h={"25vh"} />
      <SkeletonText mt={10} height={15} w={"80%"} noOfLines={1} />
      <SkeletonText height={5} w={"40%"} noOfLines={2} />
    </VStack>
  );
}
