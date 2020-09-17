import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { getToken } from "../loginRegister/helpers";

const UpdateRating = (props) => {
  const [state, setState] = useState({
    _id: "",
    rate: "",
    comment: "",
    buttonText: "Submit",
  });
  const { _id, rate, comment } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/rating/${props.match.params._id}`)
      .then((response) => {
        console.log("Update Rating================");
        console.log(response.data);
        const { _id, rate, comment } = response.data;
        setState({
          ...state,
          _id,
          rate,
          comment,
        });
      })
      .catch((error) => alert("Error rating Data"));
  }, []);

  // onchange event handler
  const handleChange = (event) => {
    // console.log('name', name, 'event', event.target.value);
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.table({ title, content, user });
    axios
      .put(
        `${process.env.REACT_APP_API}/rating/${_id}`,
        {
          _id,
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
        console.log(response);
        const { _id, rate, comment } = response.data;
        // empty state
        setState({
          ...state,
          _id,
          rate,
          comment,
        });

        // show sucess alert
        alert(`Rating   ${comment} is updated`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-sm-2">Rating</label>
        <input
          type="number"
          name="rating"
          value={rate}
          onChange={handleChange} //When you use parenthesis you'd be invoking a function/method instead of binding it with an event handler.
          // // Never invoke the function on <input Onchange as we will invoke while returning the form later we are passinf function here >
          className="form-control col-sm-4"
          placeholder="Enter Rating"
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
          {/* {buttonText} */} Updated
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
  );

  return (
    <div className="container pb-5">
      <br />
      <h1>UPDATE Rating</h1>
      {showUpdateForm()}
    </div>
  );
};
export default UpdateRating;
