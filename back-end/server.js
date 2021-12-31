var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");

var app = express();

app
  .use(express.json({limit: "50mb"}))
  .use(
    express.urlencoded({
      limit: "50mb",
      extended: false,
    })
  )
  .use(cors())
  .use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world, this is the tune tailor backend");
});

const spotify = require("./routes/spotify");
app.use("/api/spotify", spotify.routes);

const automl = require("./routes/automl");
app.use("/api/automl", automl.routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
