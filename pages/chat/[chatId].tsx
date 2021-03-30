import Head from "next/head";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";

import Sidebar from "components/Sidebar";
import ChatScreen from "components/ChatScreen";
import { NextPageContext } from "next";
import { auth, db } from "../../firebase";
import getReciepientEmail from "utils/getRecipientEmail";

export type ChatScreenProps = {
  chat: any;
  messages: string;
};

const Chat = ({ chat, messages }: ChatScreenProps) => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getReciepientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context: NextPageContext) {
  const ref = db.collection("chats").doc(context.query.chatId as string);

  // Prep the messages on the server
  const messagesRef = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: any) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // Prep the chats on server

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  --ms-overflow-style: none;
  scrollbar-width: none;
`;
