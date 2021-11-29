import styled from "@emotion/styled";
import useAudio from "../hooks/useAudio";
import AudioProgress from "./AudioProgress";
import React from "react";

function Post({ image, song }) {
  const { playing, play, pause, currentTime, duration } = useAudio(
    song.preview
  );

  return (
    <Main onMouseEnter={play} onMouseLeave={pause}>
      <AudioProgress
        playing={playing}
        currentTime={currentTime}
        duration={duration}
      />
      <UserImage src={image.url} alt="User Image" />
      <SongMain>
        <AlbumImageParent>
          <AlbumImage src={song.image} alt="Album Image" />
        </AlbumImageParent>
        <Info>
          <Title>{song.name}</Title>
          <Artist>{song.artist}</Artist>
        </Info>
      </SongMain>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  min-height: 5rem;
  overflow: hidden;

  cursor: pointer;
`;

const UserImage = styled.img`
  width: 100%;
  display: block;
  /* border-radius: 0 0 6px 6px; */
`;

const SongMain = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0px;
  z-index: 3;

  background: rgb(20, 20, 20);
  color: rgb(222, 222, 222);
  background: var(--white);
  color: var(--black);
  box-sizing: border-box;
`;

const AlbumImageParent = styled.div`
  flex-basis: 5rem;
  height: 5rem;
  width: 5rem;
  margin-right: 0.8rem;
  background: var(--black);
  /* border-radius: 0 0 0 6px; */
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  /* border-radius: 0 0 0 6px; */
  flex: 0 0 auto;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: calc(100% - 6.4rem);
  flex: 1 2 auto;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
`;

const Artist = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
`;

export default Post;
