import React from "react";
import styled from "@emotion/styled";
import LoadingAnimation from "./LoadingAnimation";

function PostingModal({ show }) {
  return show ? (
    <Main>
      <Content>
        <h2>Posting ...</h2>
        <LoadingAnimation/>
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
  margin-top: -2rem;
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 400;
`;

export default PostingModal;
