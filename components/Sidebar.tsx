import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { Avatar, Button, IconButton } from "@material-ui/core";
import { MoreVert, Chat, Search } from "@material-ui/icons";
import { auth, db } from "../firebase";
import UserChat from "./UserChat";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);

  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input !== user?.email
    ) {
      // We need to add the chat into the DB 'chats' if it does not already exist and is valid and is not user's own email
      db.collection("chats").add({
        users: [user?.email, input],
      });
    }
  };

  const chatAlreadyExist = (recipientEmail: string) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: any) => user === recipientEmail)?.length >
        0
    );

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user?.photoURL as string}
          onClick={() => auth.signOut()}
        />

        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchContainer>
        <Search />
        <SearchInput placeholder='Search in chats' />
      </SearchContainer>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <UserChat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const IconsContainer = styled.div``;
