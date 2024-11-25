"use strict";
const VideoGenerateService = require("../services/videoGenerate.service");

class VideoController {
  constructor() {
    // videoGenerateService = new VideoGenerateService();
    // this.videoGenerateService = require("../services/videoGenerate.service");;
  }

  async create(request, response) {
    const albumPaths = ["caminho-do-arquivo.jpg"];

    try {
      const videoGenerateService = new VideoGenerateService();
      // await this.videoGenerateService = new VideoGenerateService();
      await videoGenerateService.createVideoFromImages(albumPaths);

      response.status(200).json("Video generated with success!");
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = VideoController;
