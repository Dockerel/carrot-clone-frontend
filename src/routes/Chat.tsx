import { Box, Container, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Talk from "talkjs";
import { getPublicUserDetail } from "../api";
import ChatProtectPage from "../components/ChatProtectPage";
import useUser from "../lib/useUser";

export default function Chat() {
  console.log();
  let senderUsername;
  let receiverUsername;
  const { user1, user2 } = useParams();
  const { userLoading, user } = useUser();

  if (!userLoading) {
    if (user?.username === user1) {
      senderUsername = user1;
      receiverUsername = user2;
    } else {
      senderUsername = user2;
      receiverUsername = user1;
    }
  }
  const sender = user;
  const { isLoading, data } = useQuery(
    ["receiver", receiverUsername],
    getPublicUserDetail
  );

  const [talkLoaded, markTalkLoaded] = useState(false);
  const chatboxEl = useRef<any>();

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));
    if (
      talkLoaded &&
      sender !== undefined &&
      data !== undefined &&
      process.env.REACT_APP_TALKJS_APP_ID
    ) {
      const user1 = new Talk.User({
        id: `${sender.id}`,
        name: `${sender.username}`,
        email: `${sender.email}`,
        photoUrl: `${sender.avatar}`,
        role: "default",
      });
      const user2 = new Talk.User({
        id: `${data.id}`,
        name: `${data.username}`,
        email: `${data.email}`,
        photoUrl: `${data.avatar}`,
        role: "default",
      });

      const session = new Talk.Session({
        appId: process.env.REACT_APP_TALKJS_APP_ID,
        me: user1,
      });

      const conversationId = Talk.oneOnOneId(user1, user2);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(user1);
      conversation.setParticipant(user2);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded, sender, data]);

  return (
    <ChatProtectPage>
      <Box h={"100%"} mt={"40px"}>
        <Container h={"80vh"} ref={chatboxEl} />
      </Box>
    </ChatProtectPage>
  );
}
