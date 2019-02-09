import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import InventoryDashboardPage from "../components/InventoryDashboardPage";
import AddItemPage from "../components/AddItemPage";
import EditItemPage from "../components/EditItemPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={InventoryDashboardPage} />
        <PrivateRoute path="/create" component={AddItemPage} />
        <PrivateRoute path="/edit/:id" component={EditItemPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
