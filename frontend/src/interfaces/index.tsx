import { MouseEventHandler, ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

export interface IChildren {
  children: ReactNode;
}

export interface IUserData {
  username: string;
  password: string;
}

export interface IUser extends IUserSecretAccount {
  account: IAccount;
}

export interface IUserSecretAccount {
  id: string;
  username: string;
}

export interface IAccount {
  id: string;
  balance: number;
}

export interface IUserContext {
  user: IUser;
  logar: (data: IUserData) => void;
  deslogar: () => void;
  registrar: (data: IUserData) => void;
  loadProfile: () => void;
}

export interface ITransaction {
  id: string;
  value: number;
  createdAt: string;
  debitedAccount: IUserSecretAccount;
  creditedAccount: IUserSecretAccount;
}

export interface ITransactionData {
  username: string;
  value: number;
}

export interface ITransactionContext {
  transactions: ITransaction[];
  loadTransactions: (type: "in" | "out" | "all", date?: string) => void;
  makeTransaction: (
    data: ITransactionData,
    handleClose: () => void,
    filter: "all" | "in" | "out",
    date: string
  ) => void;
}

export interface IInputProps {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  type?: string;
  step?: string;
}

export interface IFormProps extends IChildren {
  handleSubmit: any;
  props?: any;
}

export interface IButtonProps {
  name: string;
  type: "button" | "reset" | "submit" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  className?: string;
}

export interface IStyledButtonProps {
  width?: string;
}

export interface IHeaderProps {
  logOutButton?: boolean;
}

export interface IModal {
  open: boolean;
  handleClose: () => void;
  filter: "all" | "in" | "out";
  date: string;
}
