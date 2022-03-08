import { MouseEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react";
import { Picker } from "emoji-mart";
import Cryptojs from "crypto-js";

import { ChatScreenProps } from "pages/chat/[chatId]";
import { auth, db } from "../firebase";
import { Avatar, IconButton, Popover } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons";
import Message from "./Message";
import getReciepientEmail from "utils/getRecipientEmail";

import "emoji-mart/css/emoji-mart.css";

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

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getReciepientEmail(chat.users, user))
  );

  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    // @ts-ignore
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      scrollToBottom();
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
    } else {
      return JSON.parse(messages).map((message: any) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e: any) => {
    e.preventDefault();

    // Update the last seen
    db.collection("users").doc(user?.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats")
      .doc(router.query.chatId as string)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: Cryptojs.AES.encrypt(
          input,
          process.env.NEXT_PUBLIC_SECRET_KEY as string
        ).toString(),
        user: user?.email,
        photoURL: user?.photoURL,
      });

    setInput("");
    scrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getReciepientEmail(chat.users, user);

  // const addEmoji = (e) => {
  //   let emoji = e.native;
  //   setInput(input + emoji);
  // };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const addEmoji = (e: any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
        )}

        <HeaderInformation>
          {recipientSnapshot ? <h3>{recipient?.name}</h3> : <h3>Loading..</h3>}
          <span>{recipientEmail}</span>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
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
        <EndOfMessages ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
        <IconButton onClick={handleClick}>
          <InsertEmoticon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Picker onSelect={addEmoji} />
        </Popover>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type='submit' onClick={sendMessage}>
          Send Message
        </button>
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
    margin-bottom: 0px;
  }

  > span {
    color: black;
  }

  > p {
    margin-top: 5px;
    font-size: 14px;
    color: gray;
  }
`;

const EndOfMessages = styled.div`
  margin-bottom: 50px;
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
