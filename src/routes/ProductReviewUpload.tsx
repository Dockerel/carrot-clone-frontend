import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Textarea,
  useSlider,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ReviewProtectPage from "../components/ReviewProtectPage";

export default function ProductReviewUpload() {
  let rating: number;
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  interface IForm {
    payload: string;
  }
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit = (data: any) => {
    data.rating = rating;
    console.log(data);
  };
  const onChange = (data: any) => {
    rating = data;
  };
  return (
    <ReviewProtectPage>
      <Container my={100}>
        <Heading mb={"50px"} textAlign={"center"}>
          Upload Review
        </Heading>
        <VStack
          spacing={10}
          as="form"
          mt={5}
          gap={"30px"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <FormLabel>Payload</FormLabel>
            <Textarea {...register("payload")} required></Textarea>
          </FormControl>
          <Slider defaultValue={3} min={1} max={5} step={1} onChange={onChange}>
            <SliderMark value={1} {...labelStyles}>
              1
            </SliderMark>
            <SliderMark value={2} {...labelStyles}>
              2
            </SliderMark>
            <SliderMark value={3} {...labelStyles}>
              3
            </SliderMark>
            <SliderMark value={4} {...labelStyles}>
              4
            </SliderMark>
            <SliderMark value={5} {...labelStyles}>
              5
            </SliderMark>
            <SliderTrack bg="orange.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="orange" />
            </SliderTrack>
            <SliderThumb boxSize={6} bg={"orange"} />
          </Slider>

          <Button type="submit" colorScheme={"orange"} size="lg" w="100%">
            Upload Photo
          </Button>
        </VStack>
      </Container>
    </ReviewProtectPage>
  );
}
