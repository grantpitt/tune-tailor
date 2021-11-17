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

const spotify = require("./routes/spotify");
app.use("/api/spotify", spotify.routes);

const automl = require("./routes/automl");
app.use("/api/automl", automl.routes);

app.listen(3001, () => {
  console.log("Server listening on port 3001!");
});
