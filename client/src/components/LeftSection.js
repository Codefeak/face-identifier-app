import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as faceapi from 'face-api.js';

import ImageFrame from './ImageFrame';

const Wrapper = styled.div`
  grid-area: left;
  background: #63208a78;
  width: 100%;
`;

const InputSection = styled.div`
  width: 200px;
  height: 200px;
  display: block !important;
  margin: 40px auto;
  border: 2px dashed #e8e2e26e;
  color: white;
  box-shadow: inset 0px 0px 20px 14px #ff020247;
`;

const P = styled.p`
  color: white;
`;
const Input = styled.input`
  width: 200px;
  height: 200px;
`;

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
      const description = person.description.split(',');
      const distance = faceapi.round(
        faceapi.euclideanDistance(description, uploadDescription[0].descriptor)
      );
      distance <= 0.6 &&
        setState({
          ...state,
          isLoading: true,
          isScanned: true,
          identity: person
        });
    });
  };

  const handleOnDrop = async (images, data) => {
    {
      await faceapi.nets.ssdMobilenetv1.loadFromUri(
        'http://localhost:4000/static/face_model'
      );
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        'http://localhost:4000/static/face_model'
      );
      await faceapi.nets.faceRecognitionNet.loadFromUri(
        'http://localhost:4000/static/face_model'
      );
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
    <Wrapper>
      {isLoading ? (
        isScanned ? (
          <>
            <P>Identified as {state.identity.name}</P>
            <P>Social Id: {state.identity.socialID}</P>
            <P>Gender is {state.identity.gender}</P>
          </>
        ) : (
          <>
            <ImageFrame file={fileAsDataURL} />
            <P>Scanning in progress...</P>
          </>
        )
      ) : (
        <Dropzone onDrop={acceptedFiles => handleOnDrop(acceptedFiles, data)}>
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
    </Wrapper>
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
