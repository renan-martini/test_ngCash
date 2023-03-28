import { IButtonProps } from "../../interfaces";
import { StyledButton } from "./styles";

function Button({ type, name, onClick, width, className }: IButtonProps) {
  return onClick ? (
    <StyledButton
      className={className}
      type={type}
      onClick={onClick}
      width={width}
    >
      {name}
    </StyledButton>
  ) : (
    <StyledButton className={className} type={type}>
      {name}
    </StyledButton>
  );
}

export default Button;
