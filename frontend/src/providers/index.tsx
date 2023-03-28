import { IChildren } from "../interfaces";
import TransactionProvider from "./transactions";
import UserProvider from "./user";

function Providers({ children }: IChildren) {
  return (
    <UserProvider>
      <TransactionProvider>{children}</TransactionProvider>
    </UserProvider>
  );
}

export default Providers;
