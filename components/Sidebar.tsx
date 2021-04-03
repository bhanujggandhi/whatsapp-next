import { MouseEvent, useState } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import axios from "axios";

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  InputLabel,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert, Chat, Search } from "@material-ui/icons";
import { auth, db } from "../firebase";
import UserChat from "./UserChat";
import { Field, Form, Formik } from "formik";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);

  const [chatsSnapshot] = useCollection(userChatRef);

  if (process.env.NODE_ENV === "production") {
    console.log(process.env.EMAIL);
    console.log(process.env.PASSWORD);
  }

  // @ts-ignore
  const createChat = async (
    values: {
      email: string;
    } & {
      email: string;
    }
  ) => {
    try {
      const { email } = values;

      if (!chatAlreadyExist(email) && email !== user?.email) {
        // We need to add the chat into the DB 'chats' if it does not already exist and is valid and is not user's own email

        await axios.post("/api/mail", {
          from: user?.email,
          to: email,
        });

        db.collection("chats").add({
          users: [user?.email, email],
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const chatAlreadyExist = (recipientEmail: string) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: any) => user === recipientEmail)?.length >
        0
    );

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Header>
          <UserAvatar src={user?.photoURL as string} />

          <IconsContainer>
            <IconButton onClick={handleOpen}>
              <Chat />
            </IconButton>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </IconsContainer>
        </Header>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          keepMounted
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
        </Menu>

        <SearchContainer>
          <Search />
          <SearchInput placeholder='Search in chats' />
        </SearchContainer>

        <SidebarButton onClick={handleOpen}>Start a new chat</SidebarButton>

        {/* List of chats */}
        {chatsSnapshot?.docs.map((chat) => (
          <UserChat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Please enter an email address for the user you wish to chat with
        </DialogTitle>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, actions) => {
            createChat(values);
            actions.setSubmitting(false);
            setOpen(false);
          }}
        >
          {({ isSubmitting, initialValues }) => (
            <Form>
              <FormContainer>
                <DialogContent>
                  <FieldContainer>
                    <InputLabel htmlFor='email'>Email address</InputLabel>
                    <Field as={Input} type='email' name='email' />
                  </FieldContainer>
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={isSubmitting}
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </DialogActions>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  --ms-overflow-style: none;
  scrollbar-width: none;
`;

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldContainer = styled.div`
  padding: 15px;
`;
