import styled from "styled-components";
import { IStyledButtonProps } from "../../interfaces";

export const StyledButton = styled.button`
  width: ${({ width }: IStyledButtonProps) => (width ? width : "200px")};
  max-width: 200px;
  height: 45px;
  font-size: 18px;
  background-color: black;
  border: 1px solid rgb(48, 52, 54);
  border-radius: 22.5px;
  color: var(--white);

  &.selected {
    background-color: white;
    color: black;
    border: 1px solid black;
    text-decoration: underline;

    &:hover {
      background-color: #bcbcbc;
      transition: 0.3s;
      filter: brightness(1);
    }
  }

  &:hover {
    background-color: #0e0e0e;
    transition: 0.3s;
    filter: brightness(1);
  }
`;
