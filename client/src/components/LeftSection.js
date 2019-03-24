import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import * as faceapi from "face-api.js";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import ImageFrame from "./ImageFrame";

const Wrapper = styled.div`
  grid-area: left;
  background: #63208a78;
  width: 100%;
`;

const InputSection = styled.input`
  width: 200px;
  height: 200px;
  display: block !important;
  margin: 40px auto;
  border: 2px dashed #e8e2e26e;
  color: white;
  box-shadow: inset 0px 0px 20px 14px #ff020247;
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
    file: null
  };

  const [state, setState] = useState(stateData);
  const { isLoading, isScanned, file } = state;

  useEffect(() => {});

  const element = data => (
    <Wrapper>
      {isLoading ? (
        isScanned ? (
          <p>This is Results</p>
        ) : (
          <ImageFrame file={file} />
        )
      ) : (
        <Dropzone
          onDrop={acceptedFiles => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
              const fileAsDataURL = reader.result;
              data &&
                setState({
                  ...state,
                  isLoading: true,
                  file: fileAsDataURL,
                  humanList: data.humen
                });
            };
            reader.readAsDataURL(file);
          }}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <section>
                <div {...getRootProps()}>
                  <InputSection {...getInputProps()} />
                  <p>Drag pic file to indentify...</p>
                </div>
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
