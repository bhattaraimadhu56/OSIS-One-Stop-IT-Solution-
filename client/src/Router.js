import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import { Login } from "./loginRegister/Login";
import { Register } from "./loginRegister/Register";
import { Home } from "./loginRegister/Home";
import HomeInitial from "./layout/HomeInitial";

import { MainLayout } from "./layout/MainLayout";
import { RegisterWelcome } from "./loginRegister/RegisterWelcome";
import Dashboard from "./loginRegister/Dashboard";
import PrivateRoute from "./loginRegister/PrivateRoute";
import UpdateUser from "./loginRegister/UpdateUser";
import { CreateRating } from "./rating/CreateRating";
import UpdateRating from "./rating/UpdateRating";
import Footer from "./layout/Footer";

export const Router = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainLayout />
        <Switch>
          <Route path="/" exact component={HomeInitial} />
          <Route path="/home" exact component={Home} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/rating" exact component={CreateRating} />
          <Route path="/rating/update/:_id" exact component={UpdateRating} />

          <Route path="/registerWelcome" exact component={RegisterWelcome} />
          {/* <Route path="/user/:_id" exact component={SinglePost} /> */}
          <PrivateRoute path="/user/update/:_id" exact component={UpdateUser} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};
export default withRouter(Router);
