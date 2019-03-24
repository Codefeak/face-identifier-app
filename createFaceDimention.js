import * as faceapi from "face-api.js";
import * as canvas from "canvas";
// import "@tensorflow/tfjs-node-gpu";
import path from "path";

const ModelURL = path.join(__dirname, "/face_model/");

// const { Canvas, Image, ImageData } = canvas;

export const checkFace = async file => {
  if (!file) {
    return;
  }
  const random = await faceapi.fetchImage(file);

  const randomDescriptor = await faceapi.allFacesSsdMobilenetv1(random);
  return randomDescriptor;
};

export const createFaceDimention = async file => {
  // await faceapi.loadSsdMobilenetv1Model("ModelURL");
  // await faceapi.loadFaceLandmarkModel("ModelURL");
  // await faceapi.loadFaceRecognitionModel("ModelURL");

  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./static/face_model/");

  checkFace(file);
};
