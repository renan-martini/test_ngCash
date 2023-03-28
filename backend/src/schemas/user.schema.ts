import * as yup from "yup";
import { hashSync } from "bcryptjs";

const userSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Senha deve possuir ao menos 8 caracteres")
    .matches(/.*\d/, "Senha Deve conter ao menos um dígito")
    .matches(/.*[A-Z]/, "Senha Deve conter ao menos uma letra maiúscula")
    .required(),
  username: yup
    .string()
    .required()
    .min(3, "Username deve possuir ao menos 3 caracteres"),
});

export default userSchema;

export const userLoginSchema = yup.object().shape({
  password: yup.string().required(),
  username: yup.string().required(),
});
