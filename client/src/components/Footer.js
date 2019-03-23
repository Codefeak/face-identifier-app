import React from "react";
import styled from "styled-components";

const FooterLayout = styled.div`
  grid-area: footer;
  width: 100%;
  height: 70px;
  background-color: #896c929c;
  color: #d5e8c782;
`;

const Footer = () => <FooterLayout>CopyRight</FooterLayout>;

export default Footer;
