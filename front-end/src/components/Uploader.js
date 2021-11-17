import styled from "@emotion/styled";
import heic2any from "heic2any";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function Uploader({ setImage, setIsUploading }) {
  async function fileChanged(event) {
    setImage(null);
    setIsUploading(true);
    let file = event.target.files[0];
    if (file.type === "image/heic") {
      console.log("converting to png");
      file = await heic2any({
        blob: file,
        toType: "image/png",
        quality: 0.9,
      });
      console.log("converted to png");
    }
    let url = URL.createObjectURL(file);
    setIsUploading(false);
    setImage({ file, url, id: uuidv4() });
    event.preventDefault();
  }

  return (
    <div>
      <Label htmlFor="image-upload">Select Photo</Label>
      <Input id="image-upload" type="file" onInput={fileChanged} />
    </div>
  );
}

const Label = styled.label`
  display: block;
  font-size: 1rem;
  padding: 0.5rem 1rem;

  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  margin: 0 0 4rem 0;

  color: var(--white);
  background: var(--black);
`;

const Input = styled.input`
  display: none;
`;

export default Uploader;
