import useSpotify from "../hooks/useSpotify";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Post from "../components/Post";

import React, { useState, useEffect } from "react";

import db from "../hooks/db";
import FeedModal from "../components/FeedModal";
import useDisableBodyScroll from "../hooks/useDisableBodyScroll";

function Feed() {

  const [posts, setPosts] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const { name } = useSpotify();
  useDisableBodyScroll(showModal);

  useEffect(() => {
    if (posts !== null) return;

    (async () => {
      setPosts(await db.get());
    })();
  }, [posts, setPosts]);

  return (
    <>
    <FeedModal show={showModal} setShow={setShowModal}/>
    <Main>
      <Header username={name} />
      <Content>
        <Masonry>
          {posts &&
            posts.map((post) => {
              return (
              <PostContainer key={post.id}>
                <PostSpacing>
                  <Post data={post} />
                </PostSpacing>
              </PostContainer>)
            })}
        </Masonry>

      </Content>
    </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  width: 100vw;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
  background: var(--primary);
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: calc(50px + 1rem) 2rem 2rem;
`;

const Masonry = styled.div`
  width: 100%;
  column-gap: 1rem;

  /* Masonry on large screens */
  @media only screen and (min-width: 1080px) {
    column-count: 3;
  }

  /* Masonry on medium-sized screens */
  @media only screen and (max-width: 1079px) and (min-width: 768px) {
    column-count: 2;
  }

  /* Masonry on small screens */
  @media only screen and (max-width: 767px) and (min-width: 540px) {
    column-count: 1;
  }

  box-sizing: inherit;
  &:before,
  &:after {
    box-sizing: inherit;
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 0 1rem;
  display: inline-block;
`;

const PostSpacing = styled.div`
  padding: 1rem;
  max-width: 450px;
  margin: auto;
`;

export default Feed;
