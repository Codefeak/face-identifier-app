import * as faceapi from "face-api.js";
import * as canvas from "canvas";
import path from "path";

const ModelURL = path.join(__dirname, "/../face_model");


export const createFaceDimention = async file => {
  // await faceapi.loadSsdMobilenetv1Model("ModelURL");
  // await faceapi.loadFaceLandmarkModel("ModelURL");
  // await faceapi.loadFaceRecognitionModel("ModelURL");

  await faceapi.nets.ssdMobilenetv1.loadFromDisk(ModelURL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(ModelURL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(ModelURL);
  if (!file) {
    return;
  }
  const random = await faceapi.fetchImage(file);

  const randomDescriptor = await faceapi.allFacesSsdMobilenetv1(random);
  return randomDescriptor;
};
