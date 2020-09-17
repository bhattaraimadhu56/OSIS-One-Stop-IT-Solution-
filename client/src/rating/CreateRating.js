import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { getToken } from "../loginRegister/helpers";

export const CreateRating = () => {
  const initialState = {
    user: "",
    rate: "",
    comment: "",
    buttonText: "Submit",
  };
  const history = useHistory();
  const [data_, setData] = useState(initialState);
  // destructure the data
  const {
    user,
    rate,
    comment,

    buttonText,
  } = data_;
  // console.log(data_)

  //const currentUser = getUser(); // contains company name in helper method
  // Never invoke the function on <input Onchange>
  const handleChange = (e) => {
    // console.log(e.target.value);
    console.log(data_);
    setData({
      ...data_,
      [e.target.name]: e.target.value,
      // user: currentUser
    });
  };

  const clickSubmit = (e) => {
    // prevent browser from reloading while submitting
    e.preventDefault();
    console.log(data_);
    setData({ ...data_, buttonText: "Submitting Data" });
    // axios({
    //   method: "POST",
    //   url: `${process.env.REACT_APP_API}/rating/create`,
    //   data: {
    //     rate,
    //     comment,
    //   },
    // })
    axios
      .post(
        `${process.env.REACT_APP_API}/rating/create`,
        {
          rate,
          comment,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        console.log("CreateRating Success", response);
        setData({
          ...data_, // keep rest of value as it is
          initialState, // clear all the fields of form

          buttonText: "Submitted", // set button text as submitted data
        });
        history.push("/dashboard");
      })
      .catch((error) => {
        // console.log("CreateRating ERROR", error.response.data);
        setData({
          ...data_, // keep rest of values, no need to  clear form
          buttonText: "Submit", // inform button text  as previous
        });
      });
  };

  return (
    <React.Fragment>
      <div id="registerDiv">
        <h1> OSIS CreateRating</h1>
        {/* CreateRating Form Start */}
        {/* {JSON.stringify(data)} */}
        {/* {JSON.stringify({ cname, owner })} */}

        <form method="POST" onSubmit={clickSubmit}>
          <div className="form-group row">
            <label className="col-sm-2">Rating</label>
            <input
              type="number"
              name="rate"
              value={rate}
              onChange={handleChange} //When you use parenthesis you'd be invoking a function/method instead of binding it with an event handler.
              // // Never invoke the function on <input Onchange as we will invoke while returning the form later we are passinf function here >
              className="form-control col-sm-4"
              placeholder="Enter Comapny Name"
              required
            />

            <label className="col-sm-2">Comment</label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter Business Owner's Name"
              required
            />
          </div>

          <div className="form-group  ">
            <button
              type="button"
              className=" btn btn-md btn-danger float-left rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              // onClick={clickSubmit}
              className=" btn btn-md  btn-success float-right rounded "
            >
              {buttonText}
            </button>
            <div align="center">
              <button type="reset" className=" btn  btn-md btn-warning rounded">
                Reset
              </button>
            </div>
            {/* end of align="center " div */}
          </div>
          {/* end of form-group row div */}
        </form>
        {/* CreateRating Form End */}
        <div align="center">
          <label> Already have an account?</label>{" "}
          <Link to="/login">Login</Link>
        </div>
        {/* <a href="login"> Already have a account?</a> */}
        {/* By using <a> tag browser will reload so we use Link </a> */}
      </div>
      {/* //Endof div with id="registerDiv" */}
    </React.Fragment>
  );
};
