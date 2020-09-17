import React, { useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import { getUser, logout } from "./../loginRegister/helpers";
import Dashboard from "./../loginRegister/Dashboard";

const NavbarTop = () => {
  // hooks define at top of functions
  const history = useHistory();
  // if we use /login in the url still login form open to prevent that lets use useeffect hooks
  // if user is login if we type from url alsio login form willl not be shown
  useEffect(() => {
    getUser() && history.push("/");
  }, []);

  return (
    <React.Fragment>
      <Navbar bg="primary" sticky="top">
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className="mr-auto">
          {/* Normal Menu */}
          <Nav.Link href="/dashboard">
            <Link className="text-light"> Madhu</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/dashboard" className="text-light">
              {" "}
              Dasboard 2
            </Link>
          </Nav.Link>
          <Nav.Link href="/home" className="text-light">
            Home
          </Nav.Link>
          <Nav.Link>
            <Link to="/rating" className="text-light">
              Rating
            </Link>
          </Nav.Link>
          <Nav.Link href="/pricing" className="text-light">
            Pricing
          </Nav.Link>
          {/* DropDown Menu */}
          {/* <NavDropdown
            title="Services"
            id="basic-nav-dropdown"
            className="text-light"
          >
            <NavDropdown.Item href="/action">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {/* <Button
          // variant="outline-light"
          className="ml-3 btn btn-sm btn-warning"
        >
          <Link to="/register">Register</Link>
        </Button> */}

        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light" className="btn btn-sm">
            Search
          </Button>
        </Form> */}
        {!getUser() && (
          <>
            {/* Invoke getUser() here otherwise don't work */}
            <Button
              // variant="outline-light"
              className="ml-3 btn btn-sm btn-warning"
            >
              <Link to="/register">Register</Link>
            </Button>
            <button
              // variant="outline-light"
              className="ml-3 btn btn-sm btn-warning"
            >
              {/*  Set the condition of login
            If there is already a token/user on localstorage/ session /cooke then already signin so show logout button
            Otherwise show login button */}

              <Link to="/login">Login</Link>
            </button>
          </>
        )}
        {getUser() && (
          // Invoke logout() which is in helpers.js just removing the session/local storage data
          //logout takes function as argument so lets push the history back using useHistory () from react-router dom (hooks)

          // onClick={() => logout(() => history.push("/"))}
          // Invoke logout() which is in helpers.js just removing the session/local storage data

          //  Set the condition of login
          // If there is already a token/user on localstorage/ session /cooke then already signin so show logout button
          // Otherwise show login button and Register AS WELL
          <Nav>
            <NavDropdown title={getUser()} id="basic-nav-dropdown">
              <NavDropdown.Item href="/#">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logout(() => history.push("/"))}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Navbar>
    </React.Fragment>
  );
};
export default withRouter(NavbarTop);
