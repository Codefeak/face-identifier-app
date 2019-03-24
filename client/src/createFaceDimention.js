import * as faceapi from "face-api.js";

export const createFaceDimention = async file => {
  await Promise.all([
    faceapi.loadSsdMobilenetv1Model("./face_model/"),
    faceapi.loadFaceLandmarkModel("./face_model/"),
    faceapi.loadFaceRecognitionModel("./face_model/")
  ]);
  const checkFace = async file => {
    if (!file) {
      return;
    }
    const random = await faceapi.fetchImage(file);

    const randomDescriptor = await faceapi.allFacesSsdMobilenetv1(random);
    return randomDescriptor;
  };
  checkFace(file);
};
