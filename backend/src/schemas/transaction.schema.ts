import * as yup from "yup";

export const transactionSchema = yup.object().shape({
  username: yup.string().required(),
  value: yup.number().required(),
});
