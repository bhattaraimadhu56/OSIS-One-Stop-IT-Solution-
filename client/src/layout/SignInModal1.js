import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { SignUpModal } from "./SignUpModal";

import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import { authenticate, isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const SignInModal = ({ history }) => {
  const [isModalOpen, setModalStatus] = useState(false);
  const [values, setValues] = useState({
    email: "madhu@gmail.com",
    password: "123456",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const close = () => {
    setModalStatus(false);
  };

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
            name: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          setModalStatus(false);
          toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/private");
        });
      })
      .catch((error) => {
        // console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        // toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <React.Fragment>
      <Button
        onClick={() => setModalStatus(true)}
        variant="outline-light"
        className="ml-3 btn btn-sm btn-outline-danger"
      >
        Sign In
      </Button>
      <div>
        <Modal
          size="lg"
          className="modal-container"
          show={isModalOpen}
          onHide={() => setModalStatus(false)}
          className="border border-dark rounded"
        >
          <Modal.Header className="bg-success text-white" closeButton>
            <Modal.Title className="text-white">Login Section</Modal.Title>
          </Modal.Header>

          <Modal.Body className="bg-light text-dark">
            {/* <form method="POST" action="">
              <div class="form-group row">
                <label
                  for="email"
                  class="col-md-4 col-form-label text-md-right"
                >
                  Email Address/ UserName
                </label>
                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control "
                    name="email"
                    // value=""
                    required
                    autocomplete="email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                >
                  Password
                </label>
                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control "
                    name="password"
                    required
                    autocomplete="new-password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </form> */}
            {signinForm()}
          </Modal.Body>

          <Modal.Footer className="bg-secondary text-white">
            <span className="pull-left">Don't have a account </span>
            {SignUpModal()}
            {/* {SignUpModal() && setModalStatus(false)} */}
            {/* {SignUpModal() ? close() : "false"} */}

            {/* {setModalStatus(false) && <SignUpModal />} */}
            {/* <SignUpModal /> */}
            <Button
              onClick={() => setModalStatus(false)}
              className="btn-sm btn-outline-warning"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};
