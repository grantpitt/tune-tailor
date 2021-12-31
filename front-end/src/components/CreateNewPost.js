import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import photoIcon from "../assets/photo-icon.png";
import Uploader from "./Uploader";
import Post from "./Post";
import LoadingAnimation from "./LoadingAnimation";
import axios from "axios";
import PostingModal from "./PostingModal";
import useDisableBodyScroll from "../hooks/useDisableBodyScroll";
import db from "../hooks/db";

function CreateNewPost({ spotify }) {

  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const history = useHistory();

  useDisableBodyScroll(isPosting);

  const classify = useCallback(async (image) => {
    try {
      const { file } = image;
      const formData = new FormData();
      formData.append("image", file);
      let res = await axios.post("/api/automl/classify", formData);
      let classData = res.data[0];

      let name = classData.displayName;
      let score = classData.classification.score.toFixed(2);
      return {
        name,
        score,
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!image || song) return;

    (async () => {
      const { name } = await classify(image);
      setSong(await spotify.getSongWithTheme(name));
      setIsUploading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

 const post = async () => {
    setIsPosting(true);
    await db.post(image.file, {
      song,
      user: {
        id: spotify.id,
        name: spotify.name,
        image: image.id,
      },
    });
    setIsPosting(false);
    history.push("/feed");
  }

  const clear = () => {
    setImage(null);
    setSong(null);
    setIsUploading(false);
    setIsPosting(false);
  }

  const postPreview = () => ({
    createdAt: null,
    song,
    user: {
      id: spotify.id,
      name: spotify.name,
      url: image.url
    }
  })

  return (
    <>
      <PostingModal show={isPosting} />
      <Main uploaded={image && song ? 1 : 0}>
        <Header>
          <div style={{ justifySelf: "left" }}>
            {image && song && (
              <BackBtn onClick={clear}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </BackBtn>
            )}
          </div>
          <div style={{ justifySelf: "center" }}>Create new post</div>
          <div style={{ justifySelf: "right" }}>
            {image && song && <PostBtn onClick={post}>Share</PostBtn>}
          </div>
        </Header>
        <Content>
          {isUploading && <LoadingAnimation />}
          {image && song && <Post data={postPreview()} />}
          {!(isUploading || image) && (
            <>
              <div>
                <PhotoIcon src={photoIcon} />
              </div>
              <Uploader setImage={setImage} setIsUploading={setIsUploading} />
            </>
          )}
        </Content>
      </Main>
    </>
  );
}

const Main = styled.div`
  width: 500px;
  max-width: 100%;
  min-height: ${(props) => (props.uploaded ? "none" : "min(80vw, 500px)")};
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  background: var(--white);
  color: var(--black);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  font-size: 1.2rem;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 5px;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const PhotoIcon = styled.img`
  height: 6rem;
`;

const PostBtn = styled.div`
  cursor: pointer;
  height: fit-content;
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary);
`;

const BackBtn = styled.div`
  cursor: pointer;
  width: 1.4rem;
  height: 1.3rem;
`;

export default CreateNewPost;
