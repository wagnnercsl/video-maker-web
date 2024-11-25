const v8 = require("v8");
const path = require("path");
const { FFCreator } = require("ffcreator");
const { addScenesWithImages } = require("../utils/videoService.utils");

class VideoGenerateService {
  constructor() {}

  async createVideoFromImages(albumPaths) {
    try {
      const totalMem = v8.getHeapStatistics().total_available_size;
      const totalInGB = (totalMem / 1024 / 1024 / 1024).toFixed(2);

      console.log(`Total memory: ${totalInGB} GB`);

      console.log("existe");

      const creator = new FFCreator({
        cacheDir: "../../cache/",
        outputDir: "../../output",
        width: 1280,
        height: 720,
      });

      await addScenesWithImages(albumPaths, creator, 8);

      const currentDate = new Date();
      const filename = `${Intl.DateTimeFormat().format(currentDate)}`;
      const fname =
        filename.toString().split("/").join("-") +
        " " +
        currentDate.getHours() +
        "-" +
        currentDate.getMinutes() +
        "-" +
        currentDate.getSeconds();
      creator.output(path.join(__dirname, `../../output/${fname}.mp4`));
      creator.start();
      creator.closeLog();

      creator.on("start", () => {
        console.log("Creating video...");
      });

      creator.on("error", (error) => {
        console.error(`Error creating video: ${JSON.stringify(error)}`);
      });

      creator.on("progress", (progress) => {
        console.warn(
          `Progress: ${progress.type} ${(progress.percent * 100) >> 0}% `
        );
      });

      creator.on("complete", (complete) => {
        console.log(
          `Video created with success! \n USEAGE: ${complete.useage} \n PATH: ${complete.output}`
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = VideoGenerateService;
