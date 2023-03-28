import styled from "styled-components";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 10px;

  input {
    border-radius: 8px;
    height: 45px;
    border: none;
    padding: 15px 10px;
    &:focus {
      outline: none;
    }
  }
`;
