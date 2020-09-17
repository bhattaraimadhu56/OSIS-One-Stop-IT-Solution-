import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { SignInModal } from "./SignInModal";
import axios from "axios";
// import { isAuth } from './helpers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const SignUpModal = (props) => {
  const [isModalOpen, setModalStatus] = useState(false);

  const [values, setValues] = useState({
    name: "Madhu",
    email: "madhu@gmail.com",
    password: "123456",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting Data" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("SIGNUP SUCCESS", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        setModalStatus(false);
        // toast.success(response.data.message);
        console.log(response.data.message);
        toast("Welcome to our website");
        // <ToastContainer />;
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </div>

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
        Sign Up
      </Button>
      <div>
        <Modal
          size="lg"
          className="modal-container"
          show={isModalOpen}
          onHide={() => setModalStatus(false)}
        >
          <Modal.Header className="bg-success text-white" closeButton>
            <Modal.Title>Register Details</Modal.Title>
          </Modal.Header>

          <Modal.Body className="bg-light text-dark">
            {/* <form method="POST" action="">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">
                  Business Name
                </label>
                <div class="col-md-6">
                  <input
                    id="name"
                    type="text"
                    class="form-control "
                    name="name"
                    value=""
                    required
                    autocomplete="name"
                    autofocus
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="email"
                  class="col-md-4 col-form-label text-md-right"
                >
                  Email Address
                </label>
                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control "
                    name="email"
                    value=""
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

              <div class="form-group row">
                <label
                  for="password-confirm"
                  class="col-md-4 col-form-label text-md-right"
                >
                  Confirm Password
                </label>
                <div class="col-md-6">
                  <input
                    id="password-confirm"
                    type="password"
                    class="form-control"
                    name="password_confirmation"
                    required
                    autocomplete="new-password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
            </form> */}
            {signupForm()}
          </Modal.Body>

          <Modal.Footer className="bg-secondary text-white">
            <span className="pull-left">Already have a account </span>

            <SignInModal />

            <Button
              className="btn-sm btn-outline-warning"
              onClick={() => setModalStatus(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};
