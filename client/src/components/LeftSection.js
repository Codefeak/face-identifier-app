import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import * as faceapi from "face-api.js";

import ImageFrame from "./ImageFrame";

import {
  LeftWrapper,
  InputSection,
  P,
  InputDrop,
  Text
} from "../styledComponents";

export const HUMANLIST = gql`
  query {
    humen {
      socialID
      name
      hairColor
      gender
      description
      url
    }
  }
`;

const LeftSection = () => {
  const stateData = {
    isLoading: false,
    isScanned: false,
    fileAsDataURL: null
  };

  const [state, setState] = useState(stateData);
  const { isLoading, isScanned, fileAsDataURL } = state;

  const scanIdentification = async (data, fileAsDataURL) => {
    const upload = await faceapi.fetchImage(fileAsDataURL);
    const uploadDescription = await faceapi.allFacesSsdMobilenetv1(upload);
    data.map(async person => {
      const description = person.description.split(",");
      const distance = faceapi.round(
        faceapi.euclideanDistance(description, uploadDescription[0].descriptor)
      );
      distance <= 0.6 &&
        setState({
          ...state,
          isScanned: true,
          identity: person,
          isLoading: true,
          fileAsDataURL: fileAsDataURL,
          humanList: data
        });
    });
  };

  const handleOnDrop = async (images, data) => {
    {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("static/face_model");
      await faceapi.nets.faceLandmark68Net.loadFromUri("static/face_model");
      await faceapi.nets.faceRecognitionNet.loadFromUri("static/face_model");
      const file = images[0];
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsDataURL = reader.result;
        data &&
          setState({
            ...state,
            isLoading: true,
            fileAsDataURL: fileAsDataURL,
            humanList: data.humen
          });
        scanIdentification(data.humen, fileAsDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const element = data => (
    <LeftWrapper>
      {isLoading ? (
        <>
          <ImageFrame file={fileAsDataURL} />
          {isScanned ? (
            <Text>
              <P>
                Identified as <b>{state.identity.name}</b>
              </P>
              <P>
                Social Id: <b>{state.identity.socialID}</b>
              </P>
              <P>
                Gender is <b>{state.identity.gender}</b>
              </P>
            </Text>
          ) : (
            <Text>
              <P>Scanning in progress...</P>
            </Text>
          )}
        </>
      ) : (
        <Dropzone onDrop={acceptedFiles => handleOnDrop(acceptedFiles, data)}>
          {({ getRootProps, getInputProps }) => {
            return (
              <section>
                <InputSection {...getRootProps()}>
                  <InputDrop {...getInputProps()} />
                  <p>Drag pic file to indentify...</p>
                </InputSection>
              </section>
            );
          }}
        </Dropzone>
      )}
    </LeftWrapper>
  );

  return (
    <Query query={HUMANLIST}>
      {({ loading, data }) => !loading && element(data)}
    </Query>
  );
};

export default LeftSection;

// export const HumanQuery = graphql`
//  query
// `
