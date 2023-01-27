import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, postUploadURL, uploadImage } from "../api";

interface IForm {
  file: FileList;
  description: string;
}

export default function ProductPhotoUpload() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const { productPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        description: "Upload more images!",
        isClosable: true,
      });
      reset();
    },
  });

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: (data: any) => {
      if (productPk) {
        createPhotoMutation.mutate({
          description: watch("description"),
          file: `https://imagedelivery.net/X2ZjaLJAsruLbPnRcbA_3Q/${data.result.id}/public`,
          productPk,
        });
      }
    },
  });

  const uploadURLMutation = useMutation(postUploadURL, {
    onSuccess: (data: any) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });

  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };
  return (
    <Container my={100}>
      <Heading mb={"50px"} textAlign={"center"}>
        Upload Photo
      </Heading>
      <VStack spacing={10} as="form" mt={5} onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Select Photo</FormLabel>
          <Input
            {...register("file")}
            required
            type="file"
            accept="image/*"
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input {...register("description")} required type="text"></Input>
        </FormControl>

        <Button
          isLoading={
            uploadURLMutation.isLoading ||
            uploadImageMutation.isLoading ||
            createPhotoMutation.isLoading
          }
          type="submit"
          colorScheme={"orange"}
          size="lg"
          w="100%"
        >
          Upload Photo
        </Button>
      </VStack>
    </Container>
  );
}
