import { Avatar, Box, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getMeChattingroom } from "../api";
import ChatProtectPage from "../components/ChatProtectPage";
import useUser from "../lib/useUser";

interface IUsername {
  username: string;
  avatar: string;
}

interface IForm {
  id: string;
  users: IUsername[];
  created_at: string;
  updated_at: string;
}

export default function Chat() {
  const dateFormat = (date: string) => {
    const getMonth = (monthStr: string) => {
      return new Date(monthStr + "-1-01").getMonth() + 1;
    };

    const today = new Date().toString().split(" ");
    const targetDate = date.split("T")[0].split("-");
    if (Number(today[3]) > Number(targetDate[0])) {
      return `${Number(today[3]) - Number(targetDate[0])} years ago`;
    } else if (Number(getMonth(today[1])) > Number(getMonth(targetDate[1]))) {
      return `${
        Number(getMonth(today[1])) - Number(getMonth(targetDate[1]))
      } months ago`;
    } else if (Number(today[2]) > Number(targetDate[2])) {
      return `${Number(today[2]) - Number(targetDate[2])} days ago`;
    } else {
      return "today";
    }
  };
  const { isLoading, data } = useQuery<IForm[]>(
    ["chattingrooms"],
    getMeChattingroom
  );
  const { user, isLoggedIn, userLoading } = useUser();
  return (
    <ChatProtectPage>
      {isLoading || userLoading ? (
        <HStack w={"100%"} justify={"center"} mt={"300px"}>
          <Spinner size={"xl"} />
        </HStack>
      ) : (
        <HStack height={"80vh"} justify={"center"}>
          <VStack width={"470px"} align={"flex-start"} p={"30px"} h={"80%"}>
            <Box
              mb={"10px"}
              pb={"10px"}
              w={"100%"}
              borderBottom={"1px solid gray"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Chats
            </Box>
            {data?.map((room) => (
              <Link
                to={
                  room.users[0].username === user?.username
                    ? `/chat/${room.users[1].username}`
                    : `/chat/${room.users[0].username}`
                }
                key={room.id}
              >
                <HStack
                  borderRadius={"md"}
                  _hover={{
                    backgroundColor: "gray",
                  }}
                  p={"15px"}
                  justify={"space-between"}
                  w={"400px"}
                >
                  <HStack>
                    <Avatar
                      mr={"10px"}
                      name={
                        room.users[0].username === user?.username
                          ? room.users[1].username
                          : room.users[0].username
                      }
                      src={
                        room.users[0].username === user?.username
                          ? room.users[1].avatar
                          : room.users[0].avatar
                      }
                    />
                    <VStack align={"flex-start"}>
                      <Box fontSize={"20px"} fontWeight={"bold"}>
                        {room.users[0].username === user?.username
                          ? room.users[1].username
                          : room.users[0].username}
                      </Box>
                    </VStack>
                  </HStack>
                  <Box fontWeight={"bold"}>
                    {dateFormat(room.updated_at.slice(0, 10))}
                  </Box>
                </HStack>
              </Link>
            ))}
          </VStack>
          <VStack
            borderLeft={"1px solid gray"}
            h={"80%"}
            w={"470px"}
            align={"center"}
            justify={"center"}
          >
            <FaSadTear fontSize={"70px"} color="orangeRed" />
            <Text color={"white"} fontSize={"30px"} fontWeight={"bold"}>
              Select chatroom
            </Text>
          </VStack>
        </HStack>
      )}
    </ChatProtectPage>
  );
}
