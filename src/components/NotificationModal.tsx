import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { deleteNotification, getMeNotification } from "../api";
import useUser from "../lib/useUser";
import { formatDate } from "../lib/utils";
import { IMeNotification } from "../types";

interface INotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
}: INotificationModalProps) {
  const navigate = useNavigate();
  const { userLoading, user } = useUser();
  const { isLoading, data } = useQuery<IMeNotification[]>(
    ["meNotification"],
    getMeNotification
  );
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation(deleteNotification, {
    onSuccess: () => {
      toast({
        title: "Chat deleted",
        status: "success",
      });
      queryClient.refetchQueries(["meNotification"]);
    },
  });
  const onDeleteClick = (pk: string) => {
    mutation.mutate(pk);
  };
  const onNtfnClick = (rUn: string, sUn: string, pk: string) => {
    if (rUn === user?.username) {
      onClose();
      navigate(`/chat/${sUn}`);
    } else {
      onClose();
      navigate(`/chat/${rUn}`);
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} motionPreset={"slideInRight"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notification</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {data?.length === 0 ? (
            <Box py={"30px"}>
              <Text fontWeight={"extrabold"} fontSize={"30px"}>
                No chats...
              </Text>
            </Box>
          ) : (
            <VStack py={"30px"} align={"flex-start"}>
              {data?.map((ntfn) => (
                <HStack
                  key={ntfn.pk}
                  mb={"10px"}
                  py={"10px"}
                  px={"20px"}
                  border={"1px solid lightgray"}
                  w={"100%"}
                  borderRadius={"2xl"}
                  justify={"space-between"}
                >
                  <>
                    <Container
                      onClick={() =>
                        onNtfnClick(
                          ntfn.receiver.username,
                          ntfn.sender.username,
                          ntfn.pk
                        )
                      }
                    >
                      <HStack>
                        <HStack>
                          <Avatar
                            name={
                              ntfn.receiver.username === user?.username
                                ? ntfn.sender.username
                                : ntfn.receiver.username
                            }
                            mr={"10px"}
                            src={
                              ntfn.receiver.username === user?.username
                                ? ntfn.sender.avatar
                                : ntfn.receiver.avatar
                            }
                          />
                          <VStack align={"flex-start"}>
                            <Text fontSize={"20px"} fontWeight={"bold"}>
                              {ntfn.receiver.username === user?.username
                                ? ntfn.sender.username
                                : ntfn.receiver.username}
                            </Text>
                            <Text
                              fontSize={"15px"}
                              fontWeight={"bold"}
                              color={"gray"}
                            >
                              {formatDate(ntfn.updated_at)}
                            </Text>
                          </VStack>
                        </HStack>
                      </HStack>
                    </Container>
                  </>
                  <Button
                    onClick={() => onDeleteClick(ntfn.pk)}
                    variant={"ghost"}
                  >
                    <FaTrash />
                  </Button>
                </HStack>
              ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
