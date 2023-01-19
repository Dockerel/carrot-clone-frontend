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
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

export default function SignUpConf() {
  const [address, setAddress] = useState("");
  const [openPostcode, setOpenPostcode] = useState(false);
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
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
          <Input
            onClick={handle.clickButton}
            required
            type="text"
            value={address}
            readOnly
          ></Input>
          {openPostcode && (
            <DaumPostcode
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            />
          )}
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
