import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPublicUserDetail, getReviews } from "../api";
import publicUser from "../image/publicUser.jpg";
import { IPublicUserDetail, IReviews } from "../types";
import useUser from "../lib/useUser";
import { formatDate } from "../lib/utils";

export default function UserReviews() {
  const { username } = useParams();
  const { user } = useUser();
  const { isLoading: userDataIsLoading, data: userData } =
    useQuery<IPublicUserDetail>(["userDetail", username], getPublicUserDetail);
  const { isLoading: reviewIsLoading, data: reviewData } = useQuery<IReviews[]>(
    ["reviews", username],
    getReviews
  );
  return (
    <Center>
      <VStack align={"flex-start"} width={"50vw"} mt={10}>
        <HStack width={"100%"} height={"100px"}>
          <Img
            height={"70px"}
            width={"70px"}
            borderRadius={"full"}
            src={userData?.avatar ? userData?.avatar : publicUser}
          />
          <VStack align={"flex-start"} height={"100%"}>
            <HStack align={"flex-end"} h={"50%"}>
              <Text fontSize={22} fontWeight={"extrabold"}>
                {userData?.username}
              </Text>
              <Text>{userData?.address}</Text>
            </HStack>
            <HStack align={"flex-start"} h={"50%"}>
              <Text color={"gray"} fontWeight={"bold"}>
                Rating
              </Text>
              <Text color={"gray"} fontWeight={"bold"}>
                {userData?.rating} / 5
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack borderBottom={"1px solid orange"} w={"100%"} pb={3}>
          <Button as={"a"} href={`/user/${username}`} variant={"outline"}>
            Sale items
          </Button>
          <Button
            as={"a"}
            href={`/user/${username}/reviews`}
            variant={"solid"}
            colorScheme={"orange"}
          >
            Reviews
          </Button>
          {userData?.username !== user?.username ? null : (
            <Button
              as={"a"}
              href={`/user/${username}/purchase-history`}
              variant={"outline"}
            >
              Purchase history
            </Button>
          )}
        </HStack>
        {reviewIsLoading ? null : (
          <>
            {reviewData?.map((review, index) => (
              <VStack
                key={index}
                w={"100%"}
                h={"120px"}
                align={"flex-start"}
                padding={"10px"}
                borderBottom={"1px solid gray"}
              >
                <HStack align={"flex-end"}>
                  <Avatar
                    h={"30px"}
                    w={"30px"}
                    name={review.user.username}
                    src={review.user.avatar}
                  />
                  <Text fontWeight={"bold"} fontSize={"17px"}>
                    {review.user.username}
                  </Text>
                  <Text fontSize={"15px"}>{review.rating} / 5</Text>
                </HStack>
                <Text fontSize={"17px"}>{review.payload}</Text>
                <Text fontSize={"15px"}>{formatDate(review.created_at)}</Text>
              </VStack>
            ))}
          </>
        )}
      </VStack>
    </Center>
  );
}
