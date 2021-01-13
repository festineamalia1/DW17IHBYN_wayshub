import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import CardVideo from "components/CardVideo";

import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";

export default function Home() {
  const history = useHistory();
  const { isLoading, error, data: videos } = useQuery("getvideo", () =>
    API.get(`/videos`)
  );

  return isLoading || !videos.data.data.videos ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <div class="list-grid-prof2">
      {videos.data.data.videos.map((videos, i) => (
        <div onClick={() => history.push(`/detailvid/${videos.id}`)}>
          <CardVideo
            id={videos.id}
            thumbnail={videos.thumbnail}
            title={videos.title}
            chanelName={videos.chanels.chanelName}
            viewCount={videos.viewCount}
            createdAt={videos.createdAt}
            key={i}
          />
        </div>
      ))}
    </div>
  );
}
