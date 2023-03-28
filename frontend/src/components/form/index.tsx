import { IFormProps } from "../../interfaces";
import { StyledForm } from "./styled";

function Form({ handleSubmit, children, props }: IFormProps) {
  return (
    <StyledForm onSubmit={handleSubmit} {...props}>
      {children}
    </StyledForm>
  );
}

export default Form;
