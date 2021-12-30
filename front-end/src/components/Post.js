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
          <AlbumImage src={song.image} alt="Album Image" />
        <Info>
        <Username>grantpitt</Username>
        <UploadDate>4 hours ago</UploadDate>
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
`;

const SongMain = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  bottom: 0px;
  z-index: 3;

  background: rgb(20, 20, 20);
  color: rgb(222, 222, 222);
  background: var(--white);
  color: var(--black);
  box-sizing: border-box;
`;

const AlbumImage = styled.img`
  height: 100%;
  aspect-ratio: 1 / 1;
  display: inline-block;
`;

const Info = styled.div`
  display: grid;
  padding: 0.6rem 0.8rem;
  flex-grow: 1;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`;

const Title = styled.span`
  font-size: 1.45em;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  margin-top: 0.2rem;
  grid-column: 1 / 3;
  grid-row: 2;
`;

const Artist = styled.span`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;

  grid-column: 1 / 3;
  grid-row: 3;
`;

const Username = styled.div`
  grid-column: 1;
  grid-row: 1;

  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;

  color: Gray;
`;

const UploadDate = styled.div`
  grid-column: 2;
  grid-row: 1;
  text-align: right;

  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;

  color: Gray;
`;

export default Post;
