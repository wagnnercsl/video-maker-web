const fs = require("fs");
const { FFScene, FFImage } = require("ffcreator");

const sharp = require("sharp");

// Define as dimensões desejadas
const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

async function getImageDimensions(path = "") {
  try {
    const metadata = await sharp(path).metadata();

    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    console.error("Erro ao obter dimensões da imagem", error);
    throw error;
  }
}

// Create Image and add animation effect
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

async function getFinalImageSize(filePath) {
  const imageDimensions = await getImageDimensions(filePath);

  const newSize = calculateAspectRatioFit(
    imageDimensions.width,
    imageDimensions.height,
    VIDEO_WIDTH,
    VIDEO_HEIGHT
  );

  return { width: newSize.width, height: newSize.height };
}

async function addScenesWithImages(albumPaths, creator, sceneDuration = 5) {
  const effects = [
    "fadeIn",
    "slideInUp",
    "slideInDown",
    "slideInRight",
    "slideInLeft",
    "zoomIn",
    "rotateIn",
  ];

  for (const imagePath of albumPaths) {
    if (!fs.existsSync(imagePath)) {
      console.warn(`O arquivo ${imagePath} não existe`);
      continue;
    }

    const currentEffect = effects[Math.floor(Math.random() * effects.length)];

    const scene = new FFScene();
    scene.setDuration(sceneDuration);
    scene.setTransition("GridFlip", 2);
    creator.addChild(scene);

    const finalImageSize = await getFinalImageSize(imagePath);

    const image = new FFImage({
      path: imagePath,
      x: VIDEO_WIDTH / 2,
      y: VIDEO_HEIGHT / 2,
      width: finalImageSize.width,
      height: finalImageSize.height,
    });
    image.addEffect(currentEffect, 1, 1);
    // image.addEffect("slideOutRight", 1, 1);
    // image.addEffect("zoomIn", 2, 1);
    // image2.addEffect("rotateIn", 2, 1);
    scene.addChild(image);
  }
}

module.exports = {
  getFinalImageSize,
  addScenesWithImages,
};
