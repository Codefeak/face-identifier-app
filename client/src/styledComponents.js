import styled from "styled-components";

export const RightWrapper = styled.div`
  background: #9427275e;
  width: 100%;
  display: grid;
`;
export const Form = styled.form`
  display: grid;
  grid-template:
    "information"
    "pic"
    "btn";
  grid-template-rows: 4fr 4fr 1fr;
`;

export const Inf = styled.section`
  width: 70%;
  margin: 20px auto;
  display-area: information;
  display: grid;
  grid-template-rows: 40px repeat(auto-fill, 40px) 30px;
  background: #00000040;
  border-radius: 0px 0px 5px 5px;
  padding: 15px;
`;
export const Label = styled.label`
  display: grid;
  grid-template: "text input";
`;
export const Span = styled.span`
  grid-area: text;
  color: white;
  align-self: center;
`;
export const InputSection = styled.div`
  width: 200px;
  height: 200px;
  display: flex !important;
  align-items: center;
  margin: 40px auto;
  border: 2px dashed #e8e2e26e;
  color: white;
  box-shadow: inset 0px 0px 20px 14px #ff020247;
`;
export const Input = styled.input`
  height: 30px;
  min-width: 300px;
  background: #dddddd;
  border: none;
  color: black;
`;

export const Button = styled.button`
  max-width: 100px;
  border: 2px solid white;
  background: transparent;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  min-height: 35px;
  &:hover {
    background: white;
    color: black;
  }
`;

export const LeftWrapper = styled.div`
  grid-area: left;
  background: #63208a78;
  width: 100%;
`;

export const P = styled.p`
  color: #403737a3;
  transition: 2s;
  transition-origin: left;
`;
export const InputDrop = styled.input`
  width: 200px;
  height: 200px;
`;

export const Text = styled.div`
  margin: 30px;
  padding: 60px 40px 60px 40px;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: #d8d8d8;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
`;
