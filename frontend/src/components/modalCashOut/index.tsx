import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { IModal, ITransactionData } from "../../interfaces";
import Form from "../form";
import Input from "../input";
import { StyledModal } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { TransactionsContext } from "../../providers/transactions";
import { toast } from "react-toastify";
import Button from "../button";

function ModalCashOut({ open, handleClose, filter, date }: IModal) {
  const schema = yup.object().shape({
    username: yup.string().required("Username obrigatório"),
    value: yup.string().required("Informe um valor"),
  });

  const { makeTransaction } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransactionData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    for (const error in errors) {
      type ObjectKey = keyof typeof errors;
      toast.error(errors[error as ObjectKey]?.message, {
        toastId: errors[error as ObjectKey]?.message,
      });
    }
  }, [errors]);

  const customMakeTransaction = (data: ITransactionData) => {
    makeTransaction(data, handleClose, filter, date);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <StyledModal>
          <Form handleSubmit={handleSubmit(customMakeTransaction)}>
            <h2>Envie CA$H</h2>
            <div>
              <Input
                name="username"
                register={register}
                label="Beneficiário:"
                type="text"
              />
              <Input
                name="value"
                register={register}
                label="Valor:"
                type="number"
                step="0.01"
              />
            </div>

            <Button name="Enviar" type="submit" />
          </Form>
        </StyledModal>
      </Box>
    </Modal>
  );
}

export default ModalCashOut;
