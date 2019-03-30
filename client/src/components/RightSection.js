import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Dropzone from "react-dropzone";
import axios from "axios";
import * as faceapi from "face-api.js";

import ImageFrame from "./ImageFrame";
import inputList from "../renderInputList";

import {
  RightWrapper,
  Form,
  InputSection,
  Input,
  Button,
  Inf,
  Label,
  Span,
} from "../styledComponents";

export const ADDHUMAN = gql`
  mutation RightSection(
    $socialID: String!
    $name: String!
    $hairColor: String!
    $gender: String!
    $url: String!
    $description: String!
  ) {
    addHuman(
      socialID: $socialID
      name: $name
      hairColor: $hairColor
      gender: $gender
      description: $description
      url: $url
    ) {
      socialID
      name
      hairColor
      gender
      description
      url
    }
  }
`;

const RightSection = () => {
  const stateData = { isLoading: false, isSubmitting: false, touched: false };
  const [state, setState] = useState(stateData);
  const {
    socialID,
    name,
    hairColor,
    gender,
    url,
    isLoading,
    isSubmitting,
    touched,
    description
  } = state;

  const handleOnChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value, touched: true });
  };

  const handleOnDrop = async images => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri("static/face_model");
    await faceapi.nets.faceLandmark68Net.loadFromUri("static/face_model");
    await faceapi.nets.faceRecognitionNet.loadFromUri("static/face_model");

    const uploads = await images.map(image => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("tags", name);
      formData.append("public_id", socialID);
      formData.append("upload_preset", "uow0ce7i"); // Replace the preset name with your own
      formData.append("api_key", "{293187688448118}"); // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios
        .post(
          "https://api.cloudinary.com/v1_1/problemchild/image/upload",
          formData,
          { headers: { "X-Requested-With": "XMLHttpRequest" } }
        )
        .then(response => console.log(response));
    });
    await axios.all(uploads).then(() => {
      console.log("Image Uploaded to Cloudinary");
    });
    const reader = new FileReader();
    reader.onload = async () => {
      const fileAsDataURL = reader.result;
      const random = await faceapi.fetchImage(fileAsDataURL);
      const randomDescriptor = await faceapi.allFacesSsdMobilenetv1(random);
      setState({
        ...state,
        url: `https://res.cloudinary.com/problemchild/image/upload/v1553533460/${socialID}.jpg`,
        description: randomDescriptor[0].descriptor,
        isLoading: true
      });
    };
    reader.readAsDataURL(images[0]);
  };

  return (
    <RightWrapper>
      <Mutation mutation={ADDHUMAN}>
        {(addHuman, { data }) => (
          <Form
            id="form"
            onSubmit={e => {
              e.preventDefault();
              addHuman({
                variables: {
                  socialID: socialID,
                  name: name,
                  hairColor: hairColor,
                  gender: gender,
                  description: Array.from(description).join(),
                  url: url
                }
              });
              document.getElementById("form").reset();
              setState({ ...state, isSubmitting: true });
              window.location.reload();
            }}
          >
            <Inf>
              {inputList.map(list => (
                <Label key={list.socialID}>
                  <Span>{list.label}</Span>
                  <Input
                    name={list.name}
                    type={list.type}
                    placeholder={list.placeholder}
                    onChange={handleOnChange}
                  />
                </Label>
              ))}
            </Inf>
            {isLoading ? (
              url && <ImageFrame file={url} />
            ) : (
              <Dropzone onDrop={acceptedfiles => handleOnDrop(acceptedfiles)}>
                {({ getRootProps, getInputProps }) => {
                  return (
                    <section>
                      <InputSection {...getRootProps()}>
                        <Input {...getInputProps()} />
                        <p>Drag pic file to indentify...</p>
                      </InputSection>
                    </section>
                  );
                }}
              </Dropzone>
            )}
            <Button
              type="Submit"
              disabled={!isLoading || !isSubmitting || !touched}
            >
              Add New
            </Button>
          </Form>
        )}
      </Mutation>
    </RightWrapper>
  );
};

export default RightSection;
