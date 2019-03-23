import React from "react";
import styled from "styled-components";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RightSection from "./components/RightSection";
import LeftSection from "./components/LeftSection";

const Wrapper = styled.div`
  width: 100%;
  z-index: -99;
  background-image: url(https://media.giphy.com/media/Q6528Rrw8aKZi/giphy.gif);
  background-size: cover;
  display: grid;
  grid-template-areas:
    "header header"
    "left right"
    "footer footer";
    grid-template-rows: 1fr 11fr 1fr;
`;

const App = (props) => (
  <Wrapper>
    <Header />
      <LeftSection {...props}/>
      <RightSection />
    <Footer />
  </Wrapper>
);

export default App;
