import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/CardVideo";

import {  Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
export default function Subcribtion() {
const [state] = useContext(TaskContext);
  const chanelId = state.user.id;
  const history = useHistory();
 const { isLoading, error, data: video } = useQuery("getvideo", () =>
   API.get(`/subcribtion`)
 );
 
  return isLoading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <div className="row mt-4">
      <div className="col-2">
        <SideBar />
      </div>
      <div className="col-10">
        <div className="row">
          <div>
            <NavBar />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col pl-5 mt-5">
            <div class="list-grid-prof">
              {video.data.data.video.map((video, i) => (
                  
                <div
                  onClick={() =>
                    history.push(`/detailvid/${video.subcribe.video[0].id}`)
                  }
                >
                  <ListVideo
                    id={video.subcribe.video[0].id}
                    thumbnail={video.subcribe.video[0].thumbnail}
                    title={video.subcribe.video[0].title}
                    chanelName={video.chanelName}
                    viewCount={video.subcribe.video[0].viewCount}
                    createdAt={video.subcribe.video[0].createdAt}
                    key={i}
                  />
                </div>
                 
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

