import React, { useContext } from "react";
import { ListGroup, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png";
import { creator } from "fakeData/creator";
import Subcrib from "assets/images/subcrib.svg";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";

const SideBar = () => {
  const [state] = useContext(TaskContext);
  const chanelId = state.user.id;

  const { isLoading, error, data: video } = useQuery("getchanel", async () =>{
    const { data } = await API.get(`/subcribtion`);
    const video = data.data;
    return video;
  });
  return isLoading || !video.video ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <>
      {video.video.map((video, i) => (
        <Nav.Link
          className="row pl-5"
          href={`/creator/${video.subcribe.id}`}
        >
          <div className="row  pl-2">
            <img
              src={`http://localhost:5000/uploads/${video.subcribe.photo}`}
              alt="photo"
              className="photochanel"
            />

            <div className="col">
              <span> {video.subcribe.chanelName}</span>
            </div>
          </div>
        </Nav.Link>
      ))}
    </>
  );
};

export default SideBar;
