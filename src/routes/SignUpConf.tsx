import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function SignUpConf() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container mt={100}>
      <Heading textAlign={"center"}>Account setting</Heading>
      <VStack spacing={10} as="form" mt={5}>
        <FormControl>
          <FormLabel>Phone number</FormLabel>
          <Input required type="text"></Input>
          <FormHelperText>Write the number of your phone</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input onClick={handleClick} required type="text"></Input>
          <FormHelperText>Click to search address</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Detailed address</FormLabel>
          <Input required type="text"></Input>
          <FormHelperText>Write detailed address</FormHelperText>
        </FormControl>

        <Button type="submit" colorScheme={"orange"} size="lg" w="100%">
          Finish signup
        </Button>
      </VStack>
    </Container>
  );
}
