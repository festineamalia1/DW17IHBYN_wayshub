import React, { useEffect, useState } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/CardVideo";

import { Container, Row, Col, Image, Jumbotron, Button, Form } from "react-bootstrap";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";

export default function SearchPage() {
const location = useLocation();
  const history = useHistory();
   const [title, setTitle] = useState(location.state.query);
 const { isLoading, error, data: videos, refetch } = useQuery("getvideobytitle", () =>
   API.get(`/video2?title=${title}`)
 );
 useEffect(() => {
   refetch();
 }, [title]);

  const handleSubmit = () => {
    refetch();
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
        <div style={{ marginTop: 0, marginBottom: 25 }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              handleSubmit();
            }}
          >
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder="Search"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col>
              
              </Col>
            </Form.Row>
          </Form>
        </div>

        <div className="row">
          <div className="col pl-5 ">
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
}
