import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../api";
import { IProductDetail } from "../types";
import React from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
// import Slider from "react-slick";
import Slider from "react-slick";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import NoProductPage from "../components/NoProductPage";

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
          <Box
            position={"relative"}
            height={"600px"}
            width={"600px"}
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
                  height={"600px"}
                  position="relative"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  backgroundImage={`url(${url})`}
                />
              ))}
            </Slider>
          </Box>
        )}
      </Box>
    </NoProductPage>
  );
}
