import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postUploadProduct } from "../api";
import useUser from "../lib/useUser";

interface IForm {
  name: string;
  price: number;
  description: string;
  kind: string;
}

export default function ProductUpload() {
  const { register, handleSubmit } = useForm<IForm>();
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useUser();
  const mutation = useMutation(postUploadProduct, {
    onSuccess: () => {
      toast({
        title: "Upload finished!",
        status: "success",
      });
      navigate("/");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate({
      name: data.name,
      price: data.price,
      description: data.description,
      kind: data.kind,
    });
  };
  return (
    <Container my={100}>
      <Heading mb={"50px"} textAlign={"center"}>
        Upload product
      </Heading>
      <VStack spacing={10} as="form" mt={5} onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} required type="text"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input {...register("price")} required type="number"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")} required></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel>Kind of product</FormLabel>
          <Select {...register("kind")} placeholder="Choose a kind">
            <option value="electronics">Electronics</option>
            <option value="furnitures">Furnitures</option>
            <option value="kitchen">Kitchen</option>
            <option value="clothes">Clothes</option>
            <option value="tickets">Tickets</option>
            <option value="plants">Plants</option>
            <option value="etc">Etc</option>
          </Select>
          <FormHelperText>
            What kind of product are you going to sell?
          </FormHelperText>
        </FormControl>

        <Button type="submit" colorScheme={"orange"} size="lg" w="100%">
          Upload product
        </Button>
      </VStack>
    </Container>
  );
}
