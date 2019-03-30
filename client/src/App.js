import React from "react";
import styled from "styled-components";
import { HashRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  z-index: -99;
  background-image: url(https://media.giphy.com/media/Q6528Rrw8aKZi/giphy.gif);
  background-size: cover;
  background-position-x: -500px;
  display: grid;
  grid-template-areas:
    "header "
    "left "
    "footer ";
  grid-template-rows: 1fr 11fr 1fr;
`;

const App = props => (
  <Router>
    <Wrapper>
      <Header />
      <Route exact path="/" render={props => <LeftSection {...props} />} />
      <Route exact path="/add" render={props => <RightSection />} />
      {/* <LeftSection {...props} /> */}
      <Footer />
    </Wrapper>
  </Router>
);

export default App;
