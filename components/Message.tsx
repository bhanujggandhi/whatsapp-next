import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import Cryptojs from "crypto-js";

import { auth } from "../firebase";

const Message = ({ user, message }: any) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message
          ? Cryptojs.AES.decrypt(
              message.message,
              process.env.NEXT_PUBLIC_SECRET_KEY as string
            ).toString(Cryptojs.enc.Utf8)
          : null}
        <hr />
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
