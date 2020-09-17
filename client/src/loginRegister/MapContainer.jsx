import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { Modal, Nav, Button, NavDropdown } from "react-bootstrap";
import {
  GoogleMap,
  // LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { getUser, getUserRole, getToken } from "./helpers";
import ReactStars from "react-rating-stars-component";
// import { MapContainer } from "./MapContainer";

export const MapContainer = ({ locationDetails, latCenter, lngCenter }) => {
  // 3 Infobox
  const history = useHistory();
  const [selected, setSelected] = useState({});

  // For modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // modal end

  //  for modal rating data

  const [ratingData, setRatingData] = useState([]);
  const { ratingId, rate, comment } = ratingData;

  const fetchRatingData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/ratings`)
      .then((response) => {
        // console.log("response");
        // console.log("response.data of fetching Post ---", response.data);
        setRatingData(response.data);
      })
      .catch((error) => alert("Error fetching comments"));
  };

  useEffect(() => {
    fetchRatingData();
  }, [selected]);

  const onSelect = (item) => {
    setSelected(item);
  };

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  // const updateId = props.match.params._id;
  const defaultCenter = {
    //    New Zealand Default Location (Auckland CBD)
    lat: -37.064268,
    lng: 174.9411007,

    // lat: { latCenter },
    // lng: { lngCenter },
    // Whole NZ
    // lat: -40.9006,
    // lng: 174.886,
    // lat: selected.latitude,
    // lng: selected.longitude,
  };
  const ratingChanged = (valueofRating) => {
    // here based on rating 1 to 5 value will come
    // console.log("As usual Data");
    // console.log(rate);
    // console.log(valueofRating);
    // here we are not using the form input so e.target.value doesn't work, value already in e
    setRatingData({ ...ratingData, rate: valueofRating });

    // console.log("After1 setting to useState");
    // console.log(rate);
    // console.log("After2 setting to useState");
    // console.log(comment);
  };

  const handleComment = (e) => {
    // console.log("Before");
    // console.log(e.target.value);
    e.preventDefault();
    setRatingData({ ...ratingData, comment: e.target.value });
    // console.log("After");
    // console.log(comment);
  };

  // This is for rating model after clicking on submit
  const clickSubmit = (e) => {
    // prevent browser from reloading while submitting
    e.preventDefault();
    // console.log(ratingData);
    // setRatingData({ ...ratingData, buttonText: "Submitting Data" });
    axios
      .post(
        `${process.env.REACT_APP_API}/rating/create`,
        {
          ratingId: selected._id,
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
        // console.log("CreateRating Success", response);
        setRatingData({
          ...ratingData, // keep rest of value as it is
          comment: "", // clear all the fields of form
          rate: 5,
        });
        // history.push("/dashboard");
        // history.push("/home1");
        // setRatingData()
      })
      .catch((error) => {
        console.log("CreateRating ERROR", error.response.data);
      });
  };

  // confirmation of delete
  const deleteConfirm = (_id) => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      deletePost(_id);
    }
  };

  // delete Post from Server
  const deletePost = (_id) => {
    // console.log('delete', slug, ' post');
    axios
      .delete(`${process.env.REACT_APP_API}/rating/${_id}`, {
        headers: {
          // As similar to Postman pass Bearer space token in Header authorization section
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        fetchRatingData();
      })
      .catch((error) => alert("Error deleting comment"));
  };

  return (
    <React.Fragment>
      {/* // Modal to show */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Comment & Rating </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST" onSubmit={clickSubmit}>
            <ReactStars
              count={5}
              value={rate}
              onChange={ratingChanged}
              color="black"
              activeColor="red"
              size={40}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              // activeColor="#ffd700"
              required
            />
            {/* {rate}/{5} */}
            <textarea
              type="text"
              className="form-control"
              name="rateComment"
              onChange={handleComment}
              value={comment}
              rows="2"
              placeholder="Type your comment here"
              required
            />
            <div className="col-sm-12 mt-3">
              {/* <Button
                className="btn btn-danger btn-sm mr-3 "
                onClick={handleClose}
              >
                Close
              </Button> */}
              <Button
                type="submit"
                className="btn btn-primary btn-sm "
                // onClick={clickSubmit}
              >
                Add Comment
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <hr />

          {/* {ratingData.length >= 1 && ( */}
          {ratingData.length > 0 && (
            <div className="col-sm-12">
              <h4>Comments:</h4>
              {ratingData.map((r, i) => (
                <div
                  className="row"
                  key={i}
                  style={{ borderBottom: "1px solid silver" }}
                >
                  {r.ratingId === selected._id && (
                    <p>
                      {r.rate} /{5}--{r.comment}{" "}
                      <h6> By: {r.postedBy.owner} </h6>
                    </p>
                  )}

                  {/* {getUserRole() === "admin" && (
                    <div className="col-md-12 my-2 mx-auto">
                      <Link
                        to={`/rating/update/${post._id}`}
                        className="btn btn-sm btn-outline-warning"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => deleteConfirm(post._id)}
                        className="btn btn-sm btn-outline-danger ml-1"
                      >
                        Delete
                      </button>
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          )}
        </Modal.Footer>
      </Modal>
      {/* // end modal to show  */}
      {/* // If there is no use of google api key in index.html */}
      {/* then use{" "} */}
      {/* <LoadScript googleMapsApiKey="AIzaSyDxTV3a6oL6vAaRookXxpiJhynuUpSccjY"></LoadScript> */}
      {/* <LoadScript googleMapsApiKey="AIzaSyDxTV3a6oL6vAaRookXxpiJhynuUpSccjY"> */}
      <GoogleMap
        // mapContainerStyle={{
        //   height: "100vh",
        //   width: "100%",
        // }}
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
      >
        {getUserRole() === "admin" && (
          // Invoke getUser() which is in helpers.js just removing the session/local storage data

          <Nav className="pull-right">
            <NavDropdown title="Filter Data" id="basic-nav-dropdown">
              <NavDropdown.Item href="/#">Profile</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item>Profile 2</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}

        {/* {console.log("Location Details Madhu")}
        {console.log(locationDetails)} */}
        {locationDetails.map((item, i) => {
          return (
            <Marker
              key={item.cname}
              position={{ lat: item.latitude, lng: item.longitude }}
              clickable={true}
              onClick={() => onSelect(item)}
              // onClick={(item) => {
              //   setSelected(item);
              //   console.log("selected location");
              //   console.log(item);
              // }}
            />
          );
        })}
        {/* If and only if there is data in selected then will show InfoWindow */}
        {selected.latitude && (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div className="form-group ">
              <table>
                <tr>
                  <th>Name</th>
                  <td>{selected.cname}</td>
                </tr>
                <tr>
                  <th>Owner</th>
                  <td>{selected.owner}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>
                    {" "}
                    <a
                      href={`${process.env.REACT_APP_API_GOOGLE}/${selected.address}`}
                      target="_blank"
                      //  target="_blank" helps to open in new tab
                    >
                      {selected.address}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_API_ANYWEB}/${selected.website}`}
                      target="_blank"
                      //  target="_blank" helps to open in new tab
                    >
                      {selected.website}
                    </a>
                  </td>
                </tr>
                {getUser() && (
                  <tr>
                    <th> Rating</th>
                    <td>
                      <Button
                        className="btn btn-primary btn-sm ml-3"
                        onClick={handleShow}
                      >
                        More Info
                      </Button>
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      {/* </LoadScript> */}
    </React.Fragment>
  );
};
