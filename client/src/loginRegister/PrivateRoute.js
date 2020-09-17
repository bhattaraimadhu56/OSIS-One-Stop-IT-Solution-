/*Note about Private Route
If user is not login they should not be able to go to
admin page
dash board 
create edit update and delete information 

They are only allow to view only
*/

import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "./helpers";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getUser() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
