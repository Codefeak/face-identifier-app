import React from "react";
import styled from "styled-components";

const ImageBox = styled.div`
  width: 200px;
  height: 200px;
  display: block !important;
  margin: 40px auto;
  border: 2px dashed #e8e2e26e;
  color: white;
  box-shadow: inset 0px 0px 20px 14px #ff020247;
`;
const Image = styled.img`
  max-width: 200px;
  max-height: 200px;
`;
// const UnorderList = styled.ul`
//   list-style-type: none;
//   overflow: auto;
//   padding: 0;
// `;
// const List = styled.li`
//   //   transform: translateX(-100%);
//   //   transition: transform 0.5s, opacity 2s;
//   opacity: 1;
// `;
const ImageFrame = ({ file }) => (
  <ImageBox>
    {file && <Image src={file} alt="uploaded" />}
    {/* <UnorderList>
      <List>Prepare for Scanning...OK</List>
      <List>Overriding Security Protocols...OK</List>
      <List>Looking for relative informations...OK</List>
      <List>Authenicating Human Database...OK</List>
      <List>Face Scanning...OK</List>
      <List>Retina Scaning...OK</List>
      <List>Iris Scaning...OK</List>
      <List>Retina Scaning...OK</List>
      <List>Preparing Matching...OK </List>
      <List>Identification Verified!!! </List>
    </UnorderList> */}
  </ImageBox>
);

export default ImageFrame;
