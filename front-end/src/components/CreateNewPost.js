import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import photoIcon from "../assets/photo-icon.png";
import Uploader from "./Uploader";
import useSongSelection from "../hooks/useSongSelection";
import Post from "./Post";
import LoadingAnimation from "./LoadingAnimation";
import axios from "axios";

import db from "../hooks/db";

function CreateNewPost({ access, id }) {
  console.log("in create new post");

  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { getSongWithTheme } = useSongSelection(access);

  const classify = useCallback(async (image) => {
    try {
      const { file, url } = image;
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
    if (!image) return;

    (async () => {
      const { name, score } = await classify(image);
      setSong(await getSongWithTheme(name));
    })();
  }, [image, classify]);

  function post() {
    console.log("posting");
    console.log(image);
    db.post(image.file, {
      song,
      user: {
        id,
        image: image.id,
      }
    });
  }

  return (
    <Main>
      <Header>
        <Content>Create new post</Content>
        {image && song && (
          <Content>
            <PostButton onClick={post}>Share</PostButton>
          </Content>
        )}
      </Header>
      <Content>
        {isUploading && <LoadingAnimation />}
        {image && song && <Post image={image} song={song} />}
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
  );
}

const Main = styled.div`
  width: min(80%, 500px);
  min-height: min(80vw, 500px);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  margin: 2rem auto;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  background: var(--white);
  color: var(--black);
`;

const Header = styled.div`
  padding: 0.5rem;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 1.2rem;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-column-gap: 5px;
  border-bottom: 1px solid #dcdcdc;

  & > *:last-of-type {
    grid-column-start: 1;
    grid-row-start: 1;
    justify-self: right;
  }

  & > *:first-of-type {
    grid-column-start: 1;
    grid-row-start: 1;
    justify-self: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhotoIcon = styled.img`
  height: 6rem;
`;

const PostButton = styled.div`
  cursor: pointer;
  height: fit-content;
  /* padding: 0.6rem 1rem; */

  font-weight: 600;
  font-size: 1rem;
  /* padding: 0.5rem 1rem; */

  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;

  color: var(--secondary);
  /* background: var(--black); */
`;

export default CreateNewPost;
