import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Form from "../../components/form";
import Header from "../../components/header";
import Input from "../../components/input";
import { IUserData } from "../../interfaces";
import { UserContext } from "../../providers/user";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { StyledRegistro } from "./styles";

function Registro() {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(8, "Senha deve possuir ao menos 8 caracteres")
      .matches(/.*\d/, "Senha Deve conter ao menos um dígito")
      .matches(/.*[A-Z]/, "Senha Deve conter ao menos uma letra maiúscula"),
    username: yup
      .string()
      .required()
      .min(3, "Username deve possuir ao menos 3 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>({ resolver: yupResolver(schema) });

  const { registrar } = useContext(UserContext);

  const registerUser = (data: IUserData) => {
    registrar(data);
  };

  useEffect(() => {
    for (const error in errors) {
      type ObjectKey = keyof typeof errors;
      toast.error(errors[error as ObjectKey]?.message, {
        toastId: errors[error as ObjectKey]?.message,
      });
    }
  }, [errors]);

  return (
    <>
      <Header />
      <StyledRegistro>
        <Slide direction="up" mountOnEnter in={true} timeout={1000}>
          <Box>
            <Form handleSubmit={handleSubmit(registerUser)}>
              <h4>CADASTRO:</h4>

              <div>
                <Input label="Username:" name="username" register={register} />

                <Input
                  type="password"
                  label="Password:"
                  name="password"
                  register={register}
                />
              </div>

              <Button name="Cadastrar" type="submit" />

              <p>
                Já possui cadastro?{" "}
                <Link className="link" to={"/login"}>
                  Faça login
                </Link>
              </p>
            </Form>
          </Box>
        </Slide>
      </StyledRegistro>
    </>
  );
}

export default Registro;
