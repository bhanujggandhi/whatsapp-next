import styled from "styled-components";

const Message = ({ user, message }: any) => {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};

export default Message;

const Container = styled.div``;
