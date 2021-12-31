const express = require("express");
// const { PredictionServiceClient } = require("@google-cloud/automl").v1;
// const fs = require("fs");
// const path = require("path");

const multer = require("multer");
const upload = multer();

const projectId = "noted-gift-326402";
const location = "us-central1";
const modelId = "ICN6160939683405627392";
// const content = fs.readFileSync(path.join(__dirname, "./test.jpeg"));

// const client = new PredictionServiceClient();

const themes = ["sophisticated", "dark", "vibrant", "peaceful", "warm"];

const router = express.Router();

router.post("/classify", upload.single("image"), automl);

async function automl(req, res) {

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  res.send([
    {
      displayName: randomTheme,
      classification: {
        score: 1,
      },
    },
  ]);

  return;

  const byteContent = req.file;

  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: byteContent.buffer,
      },
    },
  };

  const [response] = await client.predict(request);

  res.send(response.payload);

  // for (const annotationPayload of response.payload) {
  //   console.log(`Predicted class name: ${annotationPayload.displayName}`);
  //   console.log(
  //     `Predicted class score: ${annotationPayload.classification.score}`
  //   );
  // }
}

module.exports = {
  routes: router,
};
