import React from "react";
import { Link } from "react-router-dom";

export const RegisterWelcome = () => {
  return (
    <div className="registerWelcome">
      <h1>Congratulation !</h1>
      <br />
      <h2>You have successfully registered.</h2> <br />
      <h3>
        Click here
        <Link to="/login">
          <label>Login</label>
        </Link>
      </h3>
    </div>
  );
};
