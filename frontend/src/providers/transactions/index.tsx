import { useContext, useState } from "react";
import { createContext } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
  IChildren,
  ITransaction,
  ITransactionContext,
  ITransactionData,
} from "../../interfaces";
import { UserContext } from "../user";

export const TransactionsContext = createContext<ITransactionContext>(
  {} as ITransactionContext
);

function TransactionProvider({ children }: IChildren) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { loadProfile } = useContext(UserContext);

  const loadTransactions = (type: "in" | "out" | "all", date?: string) => {
    API.get(`/transactions?type=${type}${date ? `&date=${date}` : ""}`)
      .then((res) => {
        setTransactions(res.data.reverse());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const makeTransaction = (
    data: ITransactionData,
    handleClose: () => void,
    filter: "all" | "in" | "out",
    date: string
  ) => {
    const id = toast.loading("Enviando...");
    API.post("/transactions", data)
      .then((res) => {
        loadTransactions(filter, date);
        loadProfile();
        handleClose();
        toast.update(id, {
          render: "Enviado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        });
      })
      .catch((err) => {
        toast.update(id, {
          render: err.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        });
      });
  };

  return (
    <TransactionsContext.Provider
      value={{
        loadTransactions,
        transactions,
        makeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export default TransactionProvider;
