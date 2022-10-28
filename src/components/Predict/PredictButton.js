import styled from "styled-components";

const PredictButton = styled.button`
  background-color: blue;
  color: white;
  cursor: pointer;
  box-shadow: 2px 2px 2px lightgray;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  transition: ease background-color 250m;
  &:hover {
    background-color: #283593;
  }
`;



  export default PredictButton;