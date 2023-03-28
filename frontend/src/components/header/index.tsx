import { StyledHeader } from "./styles";
import logo from "../../assets/logo.svg";
import Button from "../button";
import { UserContext } from "../../providers/user";
import { useContext } from "react";
import { IHeaderProps } from "../../interfaces";

function Header({ logOutButton }: IHeaderProps) {
  const { deslogar } = useContext(UserContext);
  return (
    <StyledHeader>
      <img src={logo} alt="" />
      {logOutButton && (
        <Button
          width="40%"
          type="button"
          name="Logout"
          onClick={() => deslogar()}
        />
      )}
    </StyledHeader>
  );
}

export default Header;
