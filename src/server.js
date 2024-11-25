const express = require("express");
const videoRouter = require("./routes/videoRouter");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Base route");
});

app.use(express.json());
app.use("/video", videoRouter);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
