import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { createFaceDimention } from "../createFaceDimention";

const Wrapper = styled.div`
  grid-area: right;
  background: #9427275e;
  width: 100%;
`;

const Form = styled.form`
display: flex;
flex-direction:column;
`

export const ADDHUMAN = gql`
  mutation RightSection(
    $socialID: String!
    $name: String!
    $hairColor: String!
    $description: String!
    $gender: String!
    $url: String!
  ) {
    addHuman(
      socialID: $socialID
      name: $name
      hairColor: $hairColor
      description: $description
      gender: $gender
      url: $url
    ) {
      socialID
      name
      hairColor
      description
      gender
      url
    }
  }
`;

const RightSection = () => {
  const stateData = [];
  const [state, setState] = useState(stateData);

  const handleOnChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { socialID, name, hairColor, description, gender, url } = state;

  return (
    <Wrapper>
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
                  description: description,
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
            <input
              name="description"
              type="text"
              placeholder="Description"
              onChange={handleOnChange}
            />
            <input
              name="url"
              type="text"
              placeholder="URL"
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
