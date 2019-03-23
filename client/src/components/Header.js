import React from "react";
import styled from "styled-components";

const HeaderLayout = styled.div`
  grid-area: header;
  display: flex;
  height: 70px;
  background-color: #896c929c;
  color: #d5e8c782;
  vertical-align: center;
  justify-content: center;
`;

const Header = () => (
  <HeaderLayout>
    <h1>Identity Verification App</h1>
  </HeaderLayout>
);

export default Header;
