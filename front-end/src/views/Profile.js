import React from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import useSpotifyRedirect from "../hooks/useSpotifyRedirect";

import CreateNewPost from "../components/CreateNewPost";

function Profile(props) {
  // const audioRef = useRef(null);

  const { access, name, id } = useSpotifyRedirect();

  //     audioRef.current.play();

  //   // let audio = new Audio('audio_file.mp3');
  //   // audio.play();

  return (
    <Main>
      <Header username={name}/>
      <Content>
        {access !== null ? (
          <>
            <PostContainer>
              {/* {audio && (
                <audio ref={audioRef} controls autoplay="" src={audio}> playsinline=""
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              )} */}
            </PostContainer>
            <CreateNewPost access={access} id={id} />
          </>
        ) : (
          <SetupMessage>Setting things up...</SetupMessage>
        )}
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

const SetupMessage = styled.h3`
  font-size: 1rem;
  margin: 1rem;
`;

const PostContainer = styled.div`
  width: min(80%, 500px);
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

export default Profile;
