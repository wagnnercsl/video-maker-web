const express = require("express");
const VideoController = require("../controllers/video.controller");

const videoRouter = express.Router();

const videoController = new VideoController();

videoRouter.post("/create", videoController.create);

module.exports = videoRouter;
