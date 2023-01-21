import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../api";
import { IProductDetail } from "../types";
import React from "react";
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
// import Slider from "react-slick";
import Slider from "react-slick";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import NoProductPage from "../components/NoProductPage";
import { FaSmile } from "react-icons/fa";
import { formatDate } from "../lib/utils";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ProductDetail() {
  const { productPk } = useParams();
  const { isLoading, data } = useQuery<IProductDetail>(
    ["products", productPk],
    getProduct
  );

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const cards: string[] = [];
  const photoLength = data?.photos.length;
  if (photoLength) {
    for (let i = 0; i < photoLength; i++) {
      cards.push(data?.photos[i].file);
    }
  }
  // These are the images used in the slide

  return (
    <NoProductPage>
      <Box mt={10} width={"100vw"} display="flex" justifyContent="center">
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : (
          <VStack pb={5} display="block">
            <Box
              position={"relative"}
              height={"40vw"}
              width={"40vw"}
              overflow={"hidden"}
              borderRadius={"2xl"}
            >
              {/* CSS files for react-slick */}
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />
              {/* Left Icon */}
              <IconButton
                aria-label="left-arrow"
                colorScheme="gray"
                borderRadius="full"
                position="absolute"
                left={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
              >
                <BiLeftArrowAlt fontSize={30} />
              </IconButton>
              {/* Right Icon */}
              <IconButton
                aria-label="right-arrow"
                colorScheme="gray"
                borderRadius="full"
                position="absolute"
                right={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickNext()}
              >
                <BiRightArrowAlt fontSize={30} />
              </IconButton>
              {/* Slider */}
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {cards.map((url, index) => (
                  <Box
                    key={index}
                    height={"40vw"}
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${url})`}
                  />
                ))}
              </Slider>
            </Box>
            <HStack
              borderBottom={"1px solid gray"}
              py={6}
              w={"40vw"}
              display="flex"
              justifyContent={"space-between"}
            >
              <HStack gap={3}>
                <Avatar
                  name={data?.owner.username}
                  size={"md"}
                  src={data?.owner.avatar}
                  w={"50px"}
                  h={"50px"}
                />
                <VStack display={"block"}>
                  <Text fontWeight={"bold"} fontSize={23}>
                    {data?.owner.username}
                  </Text>
                  <Text fontSize={15}>
                    {data?.owner.address.split(",")[0]} /{" "}
                    {data?.owner.address.split(",")[1]}
                  </Text>
                </VStack>
              </HStack>
              <VStack alignItems={"flex-end"}>
                <HStack>
                  <VStack>
                    <Text fontSize={20} fontWeight="bold">
                      37.4 °C
                    </Text>
                  </VStack>
                  <Box fontSize={35} color="blue.400">
                    <FaSmile />
                  </Box>
                </HStack>
                <Text fontSize={13}>매너온도</Text>
              </VStack>
            </HStack>
            <Box w={"40vw"} py={5} borderBottom={"1px solid gray"}>
              <VStack alignItems={"flex-start"}>
                <Text fontSize={20} fontWeight={"bold"}>
                  {data?.name}
                </Text>
                <HStack>
                  <Text fontSize={14}>{data?.kind}</Text>
                  <Text>∙</Text>
                  <Text fontSize={14}>{formatDate(data?.created_at)}</Text>
                </HStack>
                <Text fontWeight={"bold"} fontSize={20}>
                  {data?.price} 원
                </Text>
                <Box w={"70%"}>
                  <Text fontSize={16}>{data?.description}</Text>
                </Box>
              </VStack>
            </Box>
          </VStack>
        )}
      </Box>
    </NoProductPage>
  );
}
