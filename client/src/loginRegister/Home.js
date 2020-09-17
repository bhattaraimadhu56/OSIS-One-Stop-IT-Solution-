import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getUser, getUserRole, getToken } from "./helpers";
import { MapContainer } from "./MapContainer";
import { Autocomplete } from "@react-google-maps/api";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/users`)
      .then((response) => {
        // console.log("response");
        // console.log(response);

        console.log("response.data", response.data);
        // console.log("response.data[1]");
        // console.log(response.data[1]);
        // console.log("response.data[1].owner");
        // console.log(response.data[1].owner);

        // console.log("response.data");
        // output in console of browser
        //         0: {role: "guest", _id: "5f0b7e722e219c1588affdd9", cname: "Coding Academy", owner: "Mike", website: "www.codingAcademy.co.nz", …}
        // 1: {role: "guest", _id: "5f0b7ccf91ee5b111ccfd6ee", cname: "MadhuSoft", owner: "Madhu", website: "www.madhuinfo.tech", …}
        // 2: {role: "admin", _id: "5f098cd9115b4e0af85e5d48", cname: "Admin ", owner: "Parbati", website: "www.parbati.co.nz", …}
        // 3: {role: "admin", _id: "5f098c4c115b4e0af85e5d47", cname: "Company A", owner: "Madhu", website: "www.madhuinfo.tech", …}
        // 4: {role: "user", _id: "5f098ba8115b4e0af85e5d46", cname: "User", owner: "Prerita", website: "www.companyb.com", …}

        setPosts(response.data);
      })
      .catch((error) => alert("Error fetching users"));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
      .delete(`${process.env.REACT_APP_API}/user/${_id}`, {
        headers: {
          // As similar to Postman pass Bearer space token in Header authorization section
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((error) => alert("Error deleting user"));
  };
  // const handleMapAddress = () => (
  //   <MapContainer latCenter={post.latitude} lngCenter={post.longitude} />
  // );

  return (
    <div className="container-fluid bg-light">
      <br />
      <h1>Registered Company with their Location</h1>
      <hr />
      {/* <div className="form-group row">
            <div className="col-md-9"> Map here</div>
            <div className="col-md-3"> Details Here</div>
          </div> */}
      <div className="form-group row">
        {/* Map left Panel Div col-md-8 */}
        <div className="col-md-8">
          {console.log("consolelogPosts")}
          {console.log(posts)}

          {posts.length >= 1 && <MapContainer locationDetails={posts} />}
        </div>
        {/* Description Right Panel Div col-md-4 */}
        <div className="col-md-4 border border-success border-left-2 border-left-2 border-top-0 border-right-0 border-bottom-0 ">
          {posts.map((post, i) => (
            <div
              className="row"
              key={post._id}
              style={{ borderBottom: "1px solid silver" }}
            >
              <h2>{post.cname}</h2>
              <h4
                // onMouseOver={() => alert(post.address)}
                style={{ cursor: "pointer" }}
                onClick={() => (
                  <MapContainer
                    latCenter={post.latitude}
                    lngCenter={post.longitude}
                  />
                )}
              >
                {post.address} <br />
                {/* latCenter={post.latitude} <br />
                lngCenter={post.longitude} */}
              </h4>

              <p>
                Owner <span className="badge">{post.owner}</span> Established on
                <span className="badge">
                  {/* {new Date(post.createdAt).toLocaleString()} */}
                  {new Date(post.dob).toLocaleString()}
                </span>
              </p>
              {/* If the login user is with Role="admin" then enable for all edit
              and delete And make edit and delete options is only available to
              personal data only */}
              {(getUserRole() === "admin" || getUser() === post.cname) && (
                <div className="col-md-12 my-2 mx-auto">
                  <Link
                    to={`/user/update/${post._id}`}
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
