import styled from "@emotion/styled";
import React from "react";

function FeedModal({ show, setShow }) {

  const close = () => setShow(false);

  return show ? (
    <Main>
      <Content>
        <p style={{ margin: 0 }}>
          Welcome to the Tune Tailor Feed where you can see your friends outfits
          and the songs to go with them. Hover over an image to preview the
          tailored song!
        </p>
        <CloseBtn onClick={close}>Let's go! -&gt;</CloseBtn>
      </Content>
    </Main>
  ) : null;
}

const Main = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.65);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 600px;
  background: var(--primary);
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 400;
  padding: 2rem;
  margin: 1rem;
  box-sizing: border-box;
`;

const CloseBtn = styled.div`
  background: var(--secondary);
  color: var(--white);
  padding: 0.5rem 1rem;
  width: fit-content;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
  margin-top: 1.5rem;
`;

export default FeedModal;
