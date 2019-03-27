import styled from "styled-components";

export const RightWrapper = styled.div`
  grid-area: right;
  background: #9427275e;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  width: 300px;
`;

export const Button = styled.button`
  max-width: 100px;
  border: 2px solid white;
  background: transparent;
  color: white;
  border-radius: 5px;
  min-height: 35px;
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
