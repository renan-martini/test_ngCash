import { useEffect, useState } from "react";
import { createContext } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { IChildren, IUser, IUserContext, IUserData } from "../../interfaces";
import { useHistory } from "react-router-dom";

export const UserContext = createContext<IUserContext>({} as IUserContext);

function UserProvider({ children }: IChildren) {
  const tokenLocal = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(tokenLocal || null);
  const [user, setUser] = useState<IUser>({} as IUser);

  const history = useHistory();

  const logar = (data: IUserData) => {
    const id = toast.loading("Logando...");
    API.post("/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        setToken(response.data.token);
        toast.update(id, {
          render: "Logado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        });
        history.push("/home");
      })
      .catch((_) =>
        toast.update(id, {
          render: "Erro ao logar, username e/ou senha incorreto(s)!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        })
      );
  };

  const registrar = (data: IUserData) => {
    const id = toast.loading("Cadastrando...");
    API.post("/register", data)
      .then((response) => {
        toast.update(id, {
          render: "Cadastrado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        });
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render: err.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        });
      });
  };

  const loadProfile = () => {
    if (token) {
      API.get("/profile")
        .then((res) => {
          setUser(res.data);
          history.push("/home");
        })
        .catch((error) => {
          localStorage.removeItem("token");
          setToken("");
          setUser({} as IUser);
          return history.push("/login");
        });
    } else {
      localStorage.removeItem("token");
      setUser({} as IUser);
      return history.push("/login");
    }
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const deslogar = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser({} as IUser);
    return history.push("/login");
  };

  return (
    <UserContext.Provider
      value={{ user, logar, deslogar, registrar, loadProfile }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
