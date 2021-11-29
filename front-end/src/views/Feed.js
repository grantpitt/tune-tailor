import useSpotifyRedirect from "../hooks/useSpotifyRedirect";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Post from "../components/Post";

import React, { useState, useEffect } from "react";

import db from "../hooks/db";

function Feed() {
  const { name } = useSpotifyRedirect();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (posts !== null) return;

    (async () => {
      setPosts(await db.get());
    })();
  }, [posts, setPosts]);

  return (
    <Main>
      <Header username={name} />
      <Content>
        <Masonry>
          {posts &&
            posts.map((post) => (
              <PostContainer>
                <PostSpacing>
                  <Post song={post.song} image={{ url: post.user.url }} />
                </PostSpacing>
              </PostContainer>
            ))}
        </Masonry>
      </Content>
    </Main>
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
  /* padding: 2rem 0; */
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: calc(50px + 2rem) 2rem 2rem;
`;

const Masonry = styled.div`
  width: 100%;
  column-gap: 1em;
  /* Masonry on large screens */
  @media only screen and (min-width: 1024px) {
    column-count: 3;
  }

  /* Masonry on medium-sized screens */
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
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
  /* width: min(80%, 500px); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin: 0 auto; */
  width: 100%;
  margin: 0 0 1rem;
  display: inline-block;
  box-sizing: inherit;
`;

const PostSpacing = styled.div`
  margin: 1rem;
  box-sizing: inherit;
`;

export default Feed;
