import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { authenticate } from "./helpers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CKEditor from "ckeditor4-react";

import "./Login.css";

export const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "admin@gmail.com",
    password: "K@itr@12",
    buttonText: "Submit",
  });
  const { email, password, buttonText } = values;
  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);
        // save the response (user, token) localstorage/cookie
        authenticate(response, () => {
          setValues({
            ...values,
            buttonText: "Submitted",
          });
          {
            toast.success(`Hey ${response.data.userData.email}welcome back`);
            // console.log(response);
            // toast.success("Hey welcome back");
          }

          // history.push("/dashboard");
          history.push("/");
        });
      })
      .catch((error) => {
        // console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
      });
  };

  return (
    <div id="loginDiv" className="img-fluid animated">
      <h1> OSIS Login</h1>
      <ToastContainer />
      {/* <CKEditor data="Hello CK Editor" /> */}
      <form>
        <div class="form-group row">
          <label className="col-sm-3">Email</label>
          <input
            type="text"
            onChange={handleChange("email")}
            value={email}
            class="form-control col-sm-9"
            placeholder="Enter /email "
            required
          />
        </div>
        <div class="form-group row">
          <label className="col-sm-3">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            value={password}
            class="form-control col-sm-9"
            placeholder="Enter Password"
            required
          />
        </div>

        <div class="form-group ">
          <button
            type="submit"
            onClick={clickSubmit}
            className="btn btn-success rounded btn-sm float-right"
          >
            {buttonText}
          </button>
          <div align="center">
            <button type="button" className="btn btn-danger rounded btn-sm">
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div align="center">
        <label> Don't have an account?</label>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};
