import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getChatRoomPk,
  getMeChattingroom,
  getMessages,
  makeChatRoom,
  sendMessages,
} from "../api";
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

interface IMsgForm {
  pk: string;
  text: string;
  user: IUsername;
  created_at: string;
}

interface IMsgForm {
  text: string;
}

export default function Chat() {
  const { username } = useParams();
  const { isLoading: roomPkIsLoading, data: roomPkData } = useQuery<IForm>(
    ["chattingroom", username],
    getChatRoomPk
  );
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
  const { isLoading: allRoomIsLoading, data: allRoomData } = useQuery<IForm[]>(
    ["chattingrooms"],
    getMeChattingroom
  );
  const { user, isLoggedIn, userLoading } = useUser();

  const roomPk = roomPkData?.id;
  const { isLoading, data } = useQuery<IMsgForm[]>(
    ["messages", roomPk],
    getMessages
  );
  const { register, handleSubmit } = useForm<IMsgForm>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(sendMessages, {
    onSuccess: () => {
      queryClient.refetchQueries(["messages"]);
    },
    onError(error) {
      toast({
        title: "Error",
        status: "error",
      });
      console.log(error);
      //   navigate("/");
    },
  });
  const onSubmit = (data: any) => {
    if (roomPk && data) {
      data.text = mutation.mutate({ roomPk, text: data.text });
    }
  };
  return (
    <ChatProtectPage>
      {allRoomIsLoading || userLoading ? (
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
            {allRoomData?.map((room) => (
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
            <VStack w={"100%"} h={"100%"} overflowY={"scroll"} py={"20px"}>
              {data?.map((msg) =>
                msg.user.username === user?.username ? (
                  <HStack
                    key={msg.pk}
                    justify={"flex-end"}
                    w={"100%"}
                    h={"auto"}
                  >
                    <Box
                      borderRadius={"2xl"}
                      mr={"20px"}
                      maxWidth={"200px"}
                      wordBreak={"break-all"}
                      border={"1px solid gray"}
                      px={"20px"}
                      py={"10px"}
                    >
                      {msg.text}
                    </Box>
                  </HStack>
                ) : (
                  <HStack
                    key={msg.pk}
                    justify={"flex-start"}
                    w={"100%"}
                    h={"auto"}
                    ml={"40px"}
                  >
                    <Avatar
                      ml={"20px"}
                      name={msg.user.username}
                      src={msg.user.avatar}
                    />
                    <Box
                      borderRadius={"2xl"}
                      maxWidth={"200px"}
                      wordBreak={"break-all"}
                      border={"1px solid gray"}
                      px={"20px"}
                      py={"10px"}
                    >
                      {msg.text}
                    </Box>
                  </HStack>
                )
              )}
            </VStack>
            <HStack
              px={"20px"}
              w={"100%"}
              h={"100px"}
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <Input
                  h={"50px"}
                  {...register("text")}
                  required
                  type="text"
                ></Input>
              </FormControl>
              <Button variant={"ghost"} h={"50px"} w={"50px"} type="submit">
                <FaPaperPlane />
              </Button>
            </HStack>
          </VStack>
        </HStack>
      )}
    </ChatProtectPage>
  );
}
