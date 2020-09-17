import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./Register.css";
import axios from "axios";

export const Register = () => {
  const initialState = {
    cname: "",
    owner: "",
    website: "",
    service: "",
    phone: "",
    dob: "",
    nzbn: "",
    email: "",
    // address: "",
    // latitude: "",
    // longitude: "",
    password: "",
    buttonText: "Submit",
  };
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [latA, setLatA] = useState(29);
  const [lngB, setLngB] = useState(87);
  const [data_, setData] = useState(initialState);
  // destructure the data
  const {
    cname,
    owner,
    website,
    service,
    phone,
    dob,
    nzbn,
    email,
    // address,
    // latitude,
    // longitude,
    password,
    buttonText,
  } = data_;
  // console.log(data_)

  // Never invoke the function on <input Onchange>
  const handleChange = (e) => {
    // console.log(e.target.value);
    console.log(data_);
    setData({ ...data_, [e.target.name]: e.target.value });
  };
  const getAddress = (e) => {
    setData({ address: e.target.value });
  };
  const getLat = (e) => {
    setData({
      // latitude: document.getElementById("latitude").value(),
      ...data_,
      longitude: e.target.value,
    });
    // console.log(latitude);
    // console.log("madhu");
    console.log(data_);
  };
  const getLng = (e) => {
    setData({ ...data_, longitude: e.target.value });
  };
  const clickSubmit = (e) => {
    // prevent browser from reloading while submitting
    e.preventDefault();
    console.log(data_);
    console.log(address);
    console.log(latA);
    console.log(lngB);
    setData({ ...data_, buttonText: "Submitting Data" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: {
        cname,
        owner,
        website,
        service,
        phone,
        dob,
        nzbn,
        email,
        // address: address ,
        address,
        latitude: latA,
        longitude: lngB,
        password,
      },
    })
      .then((response) => {
        console.log("Register Success", response);
        setData({
          ...data_, // keep rest of value as it is
          initialState, // clear all the fields of form

          buttonText: "Submitted", // set button text as submitted data
        });
        history.push("/registerWelcome");
        // <Link to="/home" />;
        // <Redirect to="/dashboard" />
      })
      .catch((error) => {
        // console.log("Register ERROR", error.response.data);
        setData({
          ...data_, // keep rest of values, no need to  clear form
          buttonText: "Submit", // inform button text  as previous
        });
      });
  };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log("madhu_result");
    console.log(results);
    const latLng = await getLatLng(results[0]);

    setAddress(value);
    setLatA(latLng.lat);
    setLngB(latLng.lng);
    // console.log("madhu_latlng");
    // setCoordinates({ latA: latLng.lat, lngB: latLng.lng });
    // console.log("latA");
    // console.log({ lat });
    // console.table(latLng);
    // console.table(coordinates);
    // console.log("coordinates, address");
    // console.log(coordinates, address);
    // console.table(location);

    // console.log("Final State");
    // console.log(address, latA, lngB);
  };

  return (
    <React.Fragment>
      <div id="registerDiv">
        <h1> OSIS Register</h1>
        {/* Register Form Start */}
        {/* {JSON.stringify(data)} */}
        {/* {JSON.stringify({ cname, owner })} */}

        <form method="POST" onSubmit={clickSubmit}>
          <div className="form-group row">
            <label className="col-sm-2">Company Name</label>
            <input
              type="text"
              name="cname"
              value={cname}
              onChange={handleChange} //When you use parenthesis you'd be invoking a function/method instead of binding it with an event handler.
              // // Never invoke the function on <input Onchange as we will invoke while returning the form later we are passinf function here >
              className="form-control col-sm-4"
              placeholder="Enter Comapny Name"
              required
            />

            <label className="col-sm-2">Business Owner</label>
            <input
              type="text"
              name="owner"
              value={owner}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter Business Owner's Name"
              required
            />
          </div>

          <div className="form-group row">
            <label className="col-sm-2">Website </label>
            <input
              type="text"
              name="website"
              value={website}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter Comapny Website URL"
              required
            />

            <label className="col-sm-2">Services</label>
            <input
              type="text"
              name="service"
              value={service}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Select the service"
              required
            />
          </div>

          <div className="form-group row">
            <label className="col-sm-2">Phone:</label>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter Phone Number"
              required
            />

            <label className="col-sm-2">Established Date</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter Established Date"
              required
            />
          </div>

          <div className="form-group row">
            <label className="col-sm-2">NZBN</label>
            <input
              type="text"
              name="nzbn"
              value={nzbn}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter NZ- Business Number"
              required
            />
            <label className="col-sm-2">Official Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter Official Email"
              required
            />
          </div>

          <div className="form-group row">
            <label className="col-sm-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control col-sm-4"
              placeholder="Enter Password"
              required
            />
            <label className="col-sm-2">Address LatLng</label>
            <input
              type="text"
              id="latitude"
              name="latitude "
              value={(lngB, latA)}
              className="form-control col-sm-4"
              readOnly
            />
          </div>

          <div className="form-group row">
            <label className="col-sm-2">Address</label>
            {/* <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={getAddress}
              className="form-control col-sm-4"
              placeholder="Enter address "
              required
            /> */}

            {/* This part is autocomplete for address */}
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="col-sm-10">
                  <input
                    {...getInputProps({
                      placeholder: "Enter address",
                    })}
                    className="form-control "
                  />
                  <div>
                    {loading ? <div>...loading Please wait!</div> : null}

                    {suggestions.map((s) => {
                      const style = {
                        backgroundColor: s.active ? "#41b6e6" : "#34ebc9",
                      };

                      return (
                        <div {...getSuggestionItemProps(s, { style })}>
                          {s.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {/* End of autocomplete for address */}
          </div>
          {/* <div className="form-group col-sm-12">
            <input
              type="text"
              id="latitude"
              name="latitude "
              value={latitude}
              // onChange={getLat}
              onInput={getLat}
            />
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={longitude}
              onChange={getLng}
            />
          </div> */}
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
        {/* Register Form End */}
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
