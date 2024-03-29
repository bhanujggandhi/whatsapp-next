import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import AnagramEncryption, { AnagramConvert } from "utils/util";

import { auth } from "../firebase";
import Divider from "@material-ui/core/Divider";

const Message = ({ user, message }: any) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message
          ? AnagramEncryption.decrypt(
              message.message,
              process.env.NEXT_PUBLIC_SECRET_KEY as string
            ).toString(AnagramConvert.Utf8)
          : null}
        <Divider variant='inset' />
        <p style={{ color: "gray" }}>
          Encrypted: {message.message ? message.message : null}
        </p>
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  max-width: 45%;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
  word-break: break-all;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 10px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
