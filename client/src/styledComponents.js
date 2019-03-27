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
  display: block !important;
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
  color: white;
`;
export const InputDrop = styled.input`
  width: 200px;
  height: 200px;
`;
