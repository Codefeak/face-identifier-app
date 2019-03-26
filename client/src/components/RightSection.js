import React, { useState } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import * as faceapi from 'face-api.js';

import ImageFrame from './ImageFrame';

const Wrapper = styled.div`
  grid-area: right;
  background: #9427275e;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
const Input = styled.input`
  width: 200px;
  height: 200px;
`;

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
  const stateData = { isLoading: false };
  const [state, setState] = useState(stateData);

  const handleOnChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOnDrop = async images => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(
      'http://localhost:4000/static/face_model'
    );
    await faceapi.nets.faceLandmark68Net.loadFromUri(
      'http://localhost:4000/static/face_model'
    );
    await faceapi.nets.faceRecognitionNet.loadFromUri(
      'http://localhost:4000/static/face_model'
    );

    const { socialID, name } = state;
    const uploads = await images.map(image => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('tags', name);
      formData.append('public_id', socialID);
      formData.append('upload_preset', 'uow0ce7i'); // Replace the preset name with your own
      formData.append('api_key', '{293187688448118}'); // Replace API key with your own Cloudinary API key
      formData.append('timestamp', (Date.now() / 1000) | 0);

      return axios
        .post(
          'https://api.cloudinary.com/v1_1/problemchild/image/upload',
          formData,
          { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
        )
        .then(response => console.log(response));
    });
    await axios.all(uploads).then(() => {
      console.log('Image Uploaded to Cloudinary');
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

  const {
    socialID,
    name,
    hairColor,
    gender,
    url,
    isLoading,
    description
  } = state;
  return (
    <Wrapper>
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
              window.location.reload();
            }}
          >
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              onChange={handleOnChange}
            />
            <input
              name="socialID"
              type="text"
              placeholder="Social Security Number"
              onChange={handleOnChange}
            />
            <input
              name="hairColor"
              type="text"
              placeholder="Hair Color"
              onChange={handleOnChange}
            />
            <input
              name="gender"
              type="text"
              placeholder="Gender"
              onChange={handleOnChange}
            />
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
            <button type="Submit">Add New</button>
          </Form>
        )}
      </Mutation>
    </Wrapper>
  );
};

export default RightSection;
