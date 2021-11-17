import useSpotifyRedirect from "../hooks/useSpotifyRedirect";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Post from "../components/Post";

import React, { useState, useEffect } from "react";

import db from "../hooks/db";

function Feed() {
  const { access, refresh, name, id } = useSpotifyRedirect();

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
        <PostContainer>
          {posts &&
            posts.map((post) => (
              <PostSpacing>
                <Post song={post.song} image={{ url: post.user.url }} />
              </PostSpacing>
            ))}
          {/* {audio && (
              <audio ref={audioRef} controls autoplay="" src={audio}> playsinline=""
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            )} */}
        </PostContainer>
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
  /* background: var(--white); */
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

const PostContainer = styled.div`
  width: min(80%, 500px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const PostSpacing = styled.div`
  margin: 2rem;
`;

export default Feed;
