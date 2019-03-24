import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Dropzone from "react-dropzone";
import ImageFrame from "./ImageFrame";

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
  ) {
    addHuman(
      socialID: $socialID
      name: $name
      hairColor: $hairColor
      gender: $gender
      url: $url
    ) {
      socialID
      name
      hairColor
      gender
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

  const handleOnDrop = files => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileAsDataURL = reader.result;
      setState({ ...state, url: fileAsDataURL, isLoading: true });
    };
    reader.readAsDataURL(file);
  };
  const {
    socialID,
    name,
    hairColor,
    gender,
    url,
    isLoading
  } = state;
  console.log(state);
  return (
    <Wrapper>
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

      <Mutation mutation={ADDHUMAN}>
        {(addHuman, { data }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              addHuman({
                variables: {
                  socialID: socialID,
                  name: name,
                  hairColor: hairColor,
                  gender: gender,
                  url: url
                }
              });
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
            <button type="Submit">Add New</button>
          </Form>
        )}
      </Mutation>
    </Wrapper>
  );
};

export default RightSection;
