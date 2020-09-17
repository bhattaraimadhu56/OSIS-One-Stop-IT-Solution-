import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./Register.css";
import axios from "axios";
import { getToken } from "./helpers";

const UpdateUser = (props) => {
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [latA, setLatA] = useState(29);
  const [lngB, setLngB] = useState(87);

  const [state, setState] = useState({
    _id: "",
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
  });
  const {
    _id,
    cname,
    owner,
    website,
    service,
    phone,
    dob,
    nzbn,
    email,
    password,
  } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/user/${props.match.params._id}`)
      .then((response) => {
        console.log("Update User================");
        console.log(response.data);
        const {
          _id,
          cname,
          owner,
          website,
          service,
          phone,
          dob,
          nzbn,
          email,
          password,
          address,
        } = response.data;
        setState({
          ...state,
          _id,
          cname,
          owner,
          website,
          service,
          phone,
          dob,
          nzbn,
          email,
          password,
        });
        setAddress(response.data.address);
        console.log("Log address");
        console.log(address);
      })
      .catch((error) => alert("Error loading User Data"));
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
        `${process.env.REACT_APP_API}/user/${_id}`,
        {
          _id,
          cname,
          owner,
          website,
          service,
          phone,
          dob,
          nzbn,
          email,
          password,
          address,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const {
          _id,
          cname,
          owner,
          website,
          service,
          phone,
          dob,
          nzbn,
          email,
          password,
          address,
        } = response.data;
        // empty state
        setState({
          ...state,
          _id,
          cname,
          owner,
          website,
          service,
          phone,
          dob,
          nzbn,
          email,
          password,
        });
        setAddress(address);
        // show sucess alert
        alert(`Company  titled ${cname} is updated`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
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

  const showUpdateForm = () => (
    <form onSubmit="" method="POST" onSubmit={handleSubmit}>
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
          value={new Date(dob)
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("-")}
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
      <h1>UPDATE User</h1>
      {showUpdateForm()}
    </div>
  );
};
export default UpdateUser;
