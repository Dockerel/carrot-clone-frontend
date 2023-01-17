import { Box, Img, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProductProps {
  id: number;
  photoUrl: string;
  name: string;
  price: number;
  address: string;
}

export default function Product({
  id,
  photoUrl,
  name,
  price,
  address,
}: IProductProps) {
  return (
    <Link to={`/products/${id}`}>
      <VStack
        w={"100%"}
        display={"flex"}
        alignItems={{ sm: "center", md: "flex-start" }}
      >
        <Img
          borderRadius={"lg"}
          w={"25vh"}
          h={"25vh"}
          objectFit="cover"
          src={photoUrl}
        />
        <Box>
          <Text fontSize={20}>{name}</Text>
          <Text fontWeight={"extrabold"} fontSize={17}>
            {price} 원
          </Text>
          <Text fontSize={15}>{address}</Text>
        </Box>
      </VStack>
    </Link>
  );
}
