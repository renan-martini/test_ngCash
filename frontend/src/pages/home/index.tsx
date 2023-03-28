import Header from "../../components/header";
import { StyledHome } from "./styles";
import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/user";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BsGraphUp, BsGraphDown } from "react-icons/bs";
import Button from "../../components/button";
import { TransactionsContext } from "../../providers/transactions";
import ModalCashOut from "../../components/modalCashOut";

function Home() {
  const { user } = useContext(UserContext);
  const { transactions, loadTransactions } = useContext(TransactionsContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCash, setShowCash] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "out" | "in">("all");

  useEffect(() => {
    loadTransactions(filter, date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, filter]);
  return (
    <>
      <Header logOutButton={true} />
      <StyledHome>
        <Slide direction="up" mountOnEnter in={true} timeout={1000}>
          <Box>
            <div className="container">
              <div className="user-box">
                <div>
                  <h4>@{user?.username}</h4>
                  <p>Saldo NG</p>
                  <h5>
                    R${" "}
                    {showCash
                      ? user?.account?.balance.toFixed(2).replace(".", ",")
                      : "----,--"}{" "}
                    <button onClick={() => setShowCash(!showCash)}>
                      {showCash ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </h5>
                </div>
                <Button
                  onClick={() => setShowModal(true)}
                  name="CashOut"
                  type="button"
                  width="10vw"
                />
              </div>
              <div className="transactions-box">
                <nav>
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <section>
                    <Button
                      name="All"
                      type="button"
                      className={filter === "all" ? "selected" : ""}
                      onClick={() => setFilter("all")}
                    />
                    <Button
                      name="Out"
                      type="button"
                      className={filter === "out" ? "selected" : ""}
                      onClick={() => setFilter("out")}
                    />
                    <Button
                      name="In"
                      type="button"
                      className={filter === "in" ? "selected" : ""}
                      onClick={() => setFilter("in")}
                    />
                  </section>
                </nav>
                <ul>
                  {transactions.map((transaction, index) => {
                    const entrada =
                      transaction.creditedAccount.username === user.username;

                    const data = transaction.createdAt
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/");

                    const value = transaction.value
                      .toFixed(2)
                      .replace(".", ",");
                    return (
                      <li key={index}>
                        <div>
                          <p>
                            @
                            {entrada
                              ? transaction.debitedAccount.username
                              : transaction.creditedAccount.username}
                          </p>
                          <span>{data}</span>
                        </div>
                        <span>
                          {entrada ? (
                            <BsGraphUp color="green" size={"15px"} />
                          ) : (
                            <BsGraphDown color="red" size={"15px"} />
                          )}
                          R$ {value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Box>
        </Slide>
      </StyledHome>
      <ModalCashOut
        open={showModal}
        handleClose={() => setShowModal(false)}
        filter={filter}
        date={date}
      />
    </>
  );
}

export default Home;
