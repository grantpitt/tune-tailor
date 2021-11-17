import styled from "@emotion/styled";

function Post({ image, song }) {

  // let audio = new Audio('audio_file.mp3');
  // audio.play();

  return (
    <Main>
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
  min-height: 5.6rem;
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
  /* padding: 0.5rem; */

  background: rgba(25, 25, 25, 0.7);
  color: white;
  box-sizing: border-box;
  /* border-radius: 0 0 6px 6px; */
`;

const AlbumImageParent = styled.div`
  flex-basis: 5.6rem;
  height: 5.6rem;
  width: 5.6rem;
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
  font-size: 1.8rem;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  /* width: 160px;  */
  padding: 3px 0;
  max-width: 100%;
  height: 1.2em;
  white-space: nowrap;
`;

const Artist = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export default Post;
