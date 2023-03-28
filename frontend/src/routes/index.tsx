import { Route, Switch } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Registro from "../pages/registro";

function Routes() {
  return (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/registro" exact>
        <Registro />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default Routes;
