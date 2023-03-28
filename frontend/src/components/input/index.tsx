import { IInputProps } from "../../interfaces";
import { StyledInput } from "./styles";

function Input({ label, name, register, type, step }: IInputProps) {
  return (
    <StyledInput>
      {label && <label>{label}</label>}
      {step ? (
        <input
          type={type ? type : "text"}
          {...register(name)}
          placeholder={name}
          step={step}
        />
      ) : (
        <input
          type={type ? type : "text"}
          {...register(name)}
          placeholder={name}
        />
      )}
    </StyledInput>
  );
}

export default Input;
