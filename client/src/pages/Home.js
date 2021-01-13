import React, { useEffect, useContext, useState } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/CardVideo";


import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";

export default function Home() {
 const history = useHistory();
const [query,setQuery]=useState("");

const { isLoading, error, data: videos, refetch } = useQuery("getvideo", () =>
  API.get(`/video3?category=${query}`)
);

useEffect(()=>{
  refetch();
},[query]);

const handleClick = (e) => {
  setQuery(e.target.value);
};

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
      <div>
        <NavBar />
      </div>
      <div className="row mt-5">
        <div className="col-md-3 mt-5">
          <select className="form-control" value={query} onChange={handleClick}>
            <option value="">All Video</option>
            {videos.data.data.videos.map((videos, i) => (
              <option value={videos.category}>{videos.category}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row ">
        <div className="col pl-5 mt-5">
          <div class="list-grid-prof">
            {videos.data.data.videos.map((videos, i) => (
              <div onClick={() => history.push(`/detailvid/${videos.id}`)}>
                <ListVideo
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
        </div>
      </div>
    </div>
  </div>
);
};


