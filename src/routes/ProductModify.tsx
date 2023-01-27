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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { getProduct, putProductInformation } from "../api";
import { IProductDetail } from "../types";

interface IForm {
  name: string;
  price: number;
  description: string;
  kind: string;
}

export default function ProductModify() {
  const { register, handleSubmit } = useForm<IForm>();
  const { productPk } = useParams();
  const { isLoading, data } = useQuery<IProductDetail>(
    ["product", productPk],
    getProduct
  );
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(putProductInformation, {
    onSuccess: () => {
      toast({
        title: "Upload finished!",
        status: "success",
      });
      navigate(`/products/${productPk}`);
    },
  });

  const onSubmit = (data: any) => {
    if (productPk) {
      mutation.mutate({
        name: data.name,
        price: data.price,
        description: data.description,
        kind: data.kind,
        productPk: productPk,
      });
    }
  };
  return (
    <Container my={100}>
      <Heading mb={"50px"} textAlign={"center"}>
        Modify product information
      </Heading>
      {isLoading ? (
        <></>
      ) : (
        <VStack spacing={10} as="form" mt={5} onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              defaultValue={data?.name}
              {...register("name")}
              required
              type="text"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              defaultValue={data?.price}
              {...register("price")}
              required
              type="number"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              defaultValue={data?.description}
              {...register("description")}
              required
            ></Textarea>
          </FormControl>
          <FormControl>
            <FormLabel>Kind of product</FormLabel>
            <Select
              defaultValue={data?.kind.toLowerCase()}
              {...register("kind")}
              placeholder="Choose a kind"
            >
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
            Finish product modify
          </Button>
        </VStack>
      )}
    </Container>
  );
}
