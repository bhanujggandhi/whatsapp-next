import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { ChatScreenProps } from "pages/chat/[chatId]";
import { auth, db } from "../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons";
import Message from "./Message";

const ChatScreen = ({ chat, messages }: ChatScreenProps) => {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.chatId as string)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Avatar />

        <HeaderInformation>
          <h3>Recipient Email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessages />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input />
        <Mic />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  padding: 20px;
  background-color: whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const EndOfMessages = styled.div``;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
